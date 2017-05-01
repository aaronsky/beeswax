import * as crypto from 'crypto';
import * as koa from 'koa';
import * as Router from 'koa-router';
import { Commit, Repository } from './models';
import { BumblePluginService } from '../../../plugins/models';
import Emitter from '../../../utilities/emitter';

class Github extends BumblePluginService  {
    constructor() {
        super();
    }
    setupRoutes() {
        this.router.post('/github/receive', this.webhook.bind(this));
    }
    async webhook(ctx: koa.Context, next: () => Promise<any>) {
        await next();
        if (!this.isXHubSignatureValid(ctx.request)) {
            ctx.status = 403;
        } else {
            ctx.status = 200;
            const eventType = ctx.request.headers['x-github-event'] as string;
            const raw = ctx.request.body;
            const repository = raw['repository'] as Repository;
            const commits = raw.commits as Commit[];
            Emitter.emit(eventType, repository, commits, raw);
        }
    }
    private isXHubSignatureValid(request: koa.Request): boolean {
        const expected = crypto.createHmac('sha1', process.env.BUMBLE_GH_SECRET)
            .update(JSON.stringify(request.body), 'utf8')
            .digest('hex');
        const received = request.headers['x-hub-signature'].split('sha1=')[1];
        return crypto.timingSafeEqual(new Buffer(received, 'utf8'), new Buffer(expected, 'utf8'));
    }
}

export default Github;
