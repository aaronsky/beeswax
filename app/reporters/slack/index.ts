import * as koa from 'koa';
import * as Router from 'koa-router';
import * as querystring from 'querystring';
import { URL } from 'url';

import { EventsApi, WebApi } from './api';
import { slack } from "./slack";

namespace Slack {
    export async function receiveEvents(ctx: koa.Context, next: () => Promise<any>) {
        const body = ctx.request.body as slack.EventsApi.BaseEvent;
        if (body.token !== process.env.BUMBLE_SLACK_VERIFICATION_TOKEN) {
            ctx.status = 401;
        } else if (body.type === 'event_callback') {
            const event = body as slack.EventsApi.Event;
            EventsApi.handleEvent(event);
            ctx.status = 200;
        } else if (body.type === 'url_verification') {
            const event = body as slack.EventsApi.UrlVerificationEvent;
            ctx.response.body = {
                challenge: event.challenge
            };
            ctx.status = 200;
        }
        await next();
    }

    export async function login(ctx: koa.Context, next: () => Promise<any>) {
        ctx.redirect(getAuthorizeUrl().href);
        await next();
    }

    export async function receiveOauth(ctx: koa.Context, next: () => Promise<any>) {
        const code = ctx.query.code;
        const state = ctx.query.state;

        const args: string[] = [code, state];
        if (process.env.BUMBLE_SLACK_REDIRECT_URI) {
            const redirectUri = new URL(process.env.BUMBLE_SLACK_REDIRECT_URI);
            const params = { ...ctx.query };
            delete params.code;
            delete params.state;
            const query = querystring.stringify(params);
            redirectUri.searchParams.append('', query);
            args.push(redirectUri.href);
        }
        try {
            await performOauth.apply(performOauth, args);
        } catch (error) {
            console.error(error);
            ctx.status = 500;
        }
        await next();
    }

    function getAuthorizeUrl(): URL {
        const rootUri = new URL('https://slack.com');
        const authUri = new URL('oauth/authorize', rootUri);
        authUri.searchParams.append('client_id', process.env.BUMBLE_SLACK_CLIENT_ID);
        authUri.searchParams.append('scope', ['commands', 'channels:history', 'chat:write:bot', 'emoji:read', 'team:read'].join(','));
        authUri.searchParams.append('state', 'bumble');
        const redirectUri = new URL(process.env.BUMBLE_SLACK_REDIRECT_URI);
        redirectUri.searchParams.append('', encodeURIComponent(querystring.stringify(undefined)));
        authUri.searchParams.append('redirect_uri', redirectUri.href)
        return authUri;
    }

    async function performOauth(code: string, state: string, redirectUri?: string) {
        const opts: slack.WebApi.OauthAccessParameters = {
            client_id: process.env.BUMBLE_SLACK_CLIENT_ID,
            client_secret: process.env.BUMBLE_SLACK_CLIENT_SECRET,
            code,
            redirect_uri: redirectUri
        };

        try {
            const auth = await WebApi.oauth.access(opts);
        } catch (error) {
            throw error;
        }
    }
}
export default Slack;

export const router = new Router();

router.post('/slack/receive', Slack.receiveEvents);
router.get('/slack/login', Slack.login);
router.get('/slack/oauth', Slack.receiveOauth);