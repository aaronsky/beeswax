import * as koa from 'koa';
import * as Router from 'koa-router';
import * as querystring from 'querystring';
import { URL } from 'url';

import { EventsApi, WebApi } from './api';
import { BumblePluginService } from '../../plugins/models';
import { slack } from "./slack";

class Slack extends BumblePluginService {
    constructor() {
        super();
    }
    setupRoutes() {
        this.router.post('/slack/receive', this.receiveEvents.bind(this));
        this.router.get('/slack/login', this.login.bind(this));
        this.router.get('/slack/oauth', this.receiveOauth.bind(this));
    }
    private async receiveEvents(ctx: koa.Context, next: () => Promise<any>) {
        await next();
        const body = ctx.request.body as slack.EventsApi.BaseEvent;
        if (body.token !== process.env.BUMBLE_SLACK_VERIFICATION_TOKEN) {
            ctx.status = 403;
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
    }
    private async login(ctx: koa.Context, next: () => Promise<any>) {
        await next();
        ctx.redirect(this.getAuthorizeUrl().href);
    }
    private async receiveOauth(ctx: koa.Context, next: () => Promise<any>) {
        await next();
        
        const code = ctx.query.code;
        const state = ctx.query.state;

        if (state !== process.env.BUMBLE_SLACK_STATE) {
            ctx.status = 403;
        } else {
            let redirectUri: URL = null;
            if (process.env.BUMBLE_SLACK_REDIRECT_URI) {
                redirectUri = new URL(process.env.BUMBLE_SLACK_REDIRECT_URI);
                const params = { ...ctx.query };
                delete params.code;
                delete params.state;
                redirectUri.search = encodeURIComponent(querystring.stringify(params));
            }
            try {
                if (redirectUri) {
                    await this.performOauth(ctx, code, redirectUri.href);
                } else {
                    await this.performOauth(ctx, code);
                }
            } catch (error) {
                console.error(error);
                ctx.status = 500;
            }
        }
    }
    private getAuthorizeUrl(): URL {
        const rootUri = new URL('https://slack.com');
        const authUri = new URL('/oauth/authorize', rootUri);
        authUri.searchParams.append('client_id', process.env.BUMBLE_SLACK_CLIENT_ID);
        authUri.searchParams.append('scope', ['commands', 'channels:history', 'chat:write:bot', 'emoji:read', 'team:read'].join(','));
        authUri.searchParams.append('state', process.env.BUMBLE_SLACK_STATE);
        if (process.env.BUMBLE_SLACK_REDIRECT_URI) {
            const redirectUri = new URL(process.env.BUMBLE_SLACK_REDIRECT_URI);
            redirectUri.search = encodeURIComponent(querystring.stringify(undefined));
            authUri.searchParams.append('redirect_uri', redirectUri.href);
        }
        return authUri;
    }
    private async performOauth(ctx: koa.Context, code: string, redirectUri?: string) {
        const opts: slack.WebApi.OauthAccessParameters = {
            client_id: process.env.BUMBLE_SLACK_CLIENT_ID,
            client_secret: process.env.BUMBLE_SLACK_CLIENT_SECRET,
            code: code
        };
        if (redirectUri) {
            opts.redirect_uri = redirectUri;
        }
        try {
            const auth = await WebApi.oauth.access(opts);
            await this.performAuthTest(ctx, auth);
        } catch (error) {
            throw error;
        }
    }
    private async performAuthTest(ctx: koa.Context, auth: slack.WebApi.OauthAccessResponse) {
        const scopes = auth.scope.split(/\,/);
        const opts: slack.WebApi.AuthTestParameters = {
            token: auth.access_token
        };
        try {
            const identity = await WebApi.auth.test(opts);
            await this.processSuccessfulAuth(ctx, auth, identity);
        } catch (error) {
            throw error;
        }
    }
    private async processSuccessfulAuth(ctx: koa.Context, auth: slack.WebApi.OauthAccessResponse, identity: slack.WebApi.AuthTestResponse) {
        ctx.redirect('/');
    }
}
export default Slack;
