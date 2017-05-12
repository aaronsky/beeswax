import { IncomingMessage, ServerResponse } from 'http';
import * as koa from 'koa';
import * as Router from 'koa-router';
import { parse, Url } from 'url';

interface NextRoute {
    match: (pathname: string) => object;
    fn: Function;
}

namespace Site {
    export function routers(app, handle: (req: IncomingMessage, res: ServerResponse, parsedUrl?: Url) => Promise<any>) {
        const router = new Router();
        router.get('*', async (ctx, next) => {
            const parsed = parse(ctx.req.url, true);
            const pathComps = parsed.pathname.split('/').filter(str => str);

            const routes = app.router.routes.get(ctx.method) as Set<NextRoute>;
            let found = false;
            routes.forEach(route => {
                if (found) {
                    return;
                }
                found = !!route.match(parsed.pathname);
            });
            if (found && pathComps[0] !== 'plugins') {
                await handle(ctx.req, ctx.res, parsed);
                ctx.respond = false;
            } else {
                await next();
            }

        });
        return [router];
    }
}
export default Site;