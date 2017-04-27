import * as crypto from 'crypto';
import * as koa from 'koa';
import * as Router from 'koa-router';

const router = new Router();

function verifySignature(request: koa.Request): boolean {
    // signature = 'sha1=' + OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new('sha1'), ENV['SECRET_TOKEN'], payload_body)
    // return halt 500, "Signatures didn't match!" unless Rack::Utils.secure_compare(signature, request.env['HTTP_X_HUB_SIGNATURE'])
    const expected = crypto.createHmac('sha1', process.env.BUMBLE_GH_SECRET)
        .update(JSON.stringify(request.body), 'utf8')
        .digest('hex');
    const received = request.headers['x-hub-signature'].split('sha1=')[1];
    return crypto.timingSafeEqual(new Buffer(received, 'utf8'), new Buffer(expected, 'utf8'));
}

router.post('/github/receive', async (ctx, next) => {
    if (!verifySignature(ctx.request)) {
        ctx.status = 401;
    } else {
        ctx.status = 200;
        ctx.response.body = {
            butts: 'BUTTS!'
        };
    }
    await next();
});

export {
    router as githubRouter
}
