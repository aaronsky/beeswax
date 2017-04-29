import * as crypto from 'crypto';
import * as koa from 'koa';
import * as Router from 'koa-router';

import SCM from '../..';
import Git from '../../local';

namespace Github {
    function isXHubSignatureValid(request: koa.Request): boolean {
        // signature = 'sha1=' + OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new('sha1'), ENV['SECRET_TOKEN'], payload_body)
        // return halt 500, "Signatures didn't match!" unless Rack::Utils.secure_compare(signature, request.env['HTTP_X_HUB_SIGNATURE'])
        const expected = crypto.createHmac('sha1', process.env.BUMBLE_GH_SECRET)
            .update(JSON.stringify(request.body), 'utf8')
            .digest('hex');
        const received = request.headers['x-hub-signature'].split('sha1=')[1];
        return crypto.timingSafeEqual(new Buffer(received, 'utf8'), new Buffer(expected, 'utf8'));
    }
    
    export async function webhook(ctx: koa.Context, next: () => Promise<any>) {
        if (!isXHubSignatureValid(ctx.request)) {
            ctx.status = 401;
        } else {
            ctx.status = 200;
            const eventType = ctx.request.headers['x-github-event'] as string;
            const raw = ctx.request.body;
            const repository = new Git.Repository(raw['repository']);
            const commits = raw.commits.map(rawCommit => new Git.Commit(rawCommit));
            SCM.emit(eventType, repository, commits, raw);
        }
        await next();
    }
}

export default Github;

export const router = new Router();

router.post('/github/receive', Github.webhook);