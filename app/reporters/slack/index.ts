import * as koa from 'koa';
import * as Router from 'koa-router';
import * as querystring from 'querystring';

import { EventsApi, WebApi } from './api';
import { slack } from "./slack";

namespace Slack {
    export async function receiveEvents(ctx: koa.Context, next: () => Promise<any>) {
        const body = ctx.request.body as slack.EventsApi.Event;
        if (body.token !== process.env.BUMBLE_SLACK_VERIFICATION_TOKEN) {
            ctx.status = 401;
        } else if (body.type === 'event_callback') {
            EventsApi.handleEvent(body);
            ctx.status = 200;
        } else if (body.type === 'url_verification') {
            const event = body.event as slack.EventsApi.UrlVerificationEvent;
            ctx.response.body = {
                challenge: event.challenge
            };
            ctx.status = 200;
        }
        await next();
    }

    export async function login(ctx: koa.Context, next: () => Promise<any>) {
        ctx.redirect('https://slack.com/oauth/authorize');
        await next();
    }

    export async function receiveOauth(ctx: koa.Context, next: () => Promise<any>) {
        const code = ctx.query.code;
        const state = ctx.query.state;

        let redirectUri: string | null = process.env.BUMBLE_SLACK_REDIRECT_URI || null;
        if (redirectUri) {
            const params = { ...ctx.query };
            delete params.code;
            delete params.state;
            const query = querystring.stringify(params);
            if (query) {
                redirectUri = `${redirectUri}?${query}`;
            }
        }
        try {
            await performOauth(code, state, redirectUri);
        } catch (error) {
            console.error(error);
            ctx.status = 500;
        }
        await next();
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
router.post('/slack/login', Slack.login);
router.post('/slack/oauth', Slack.receiveOauth);