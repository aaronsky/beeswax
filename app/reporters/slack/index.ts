import * as koa from 'koa';
import * as Router from 'koa-router';
import * as querystring from 'querystring';

import { EventsApi, WebApi } from './api';

namespace Slack {
    export async function receiveEvents(ctx: koa.Context, next: () => Promise<any>) {

    }

    export async function login(ctx: koa.Context, next: () => Promise<any>) {
        ctx.redirect('https://slack.com/oauth/authorize');
        await next();
    }

    export async function receiveOauth(ctx: koa.Context, next: () => Promise<any>) {
        const code = ctx.query.code;
        const state = ctx.query.state;

        let redirectUri = process.env.BUMBLE_SLACK_REDIRECT_URI || null;
        if (redirectUri) {
            const params = { ...ctx.query };
            delete params.code;
            delete params.state;
            const query = querystring.stringify(params);
            if (query) {
                redirectUri = `${redirectUri}?${query}`;
            }
        }
        const opts = {
            client_id: process.env.BUMBLE_SLACK_CLIENT_ID,
            client_secret: process.env.BUMBLE_SLACK_CLIENT_SECRET,
            code,
            redirect_uri: redirectUri
        };

        try {
            const auth = await WebApi.oauth.access(opts);
        } catch (error) {

        }
    }
}
export default Slack;

export const router = new Router();

router.post('/slack/receive', Slack.receiveEvents);
router.post('/slack/login', Slack.login);
router.post('/slack/oauth', Slack.receiveOauth);