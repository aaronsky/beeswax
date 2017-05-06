import * as koa from 'koa';
import * as Router from 'koa-router';

type RenderContext = koa.Context & { render: (filename: string, locals?: object) => string };

namespace Site {
    const router = new Router();
    
    router.get('/', async (ctx: RenderContext, next) => {
        await next();
        ctx.status = 200;
        ctx.render('index-view');
    });

    export function routers() {
        return [router];
    }
}
export default Site;