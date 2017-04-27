import * as koa from 'koa';
import * as Router from 'koa-router';

const router = new Router();

router.post('/github/receive', async (ctx, next) => {
    const body = ctx.request.body;
    console.log(body);
    await next();
});

export {
    router as githubRouter
}
