import * as koa from 'koa';
import * as Router from 'koa-router';

import Views from '../../client';

namespace Site {
    const router = new Router();
    
    router.get('/', async (ctx, next) => {
        await next();
        try {
            ctx.body = Views.toMarkup('index');
            ctx.status = 200;
        } catch (error) {
            ctx.body = Views.toMarkup('error');
            ctx.status = 404;
        }
    });

    export function routers() {
        return [router];
    }
}
export default Site;