import { IncomingMessage, ServerResponse } from 'http';
import { Context } from 'koa';
import * as Router from 'koa-router';
import { parse, Url } from 'url';

interface NextRoute {
    match: (pathname: string) => object;
    fn: Function;
}

namespace Site {
    type NextHandleFunction = (req: IncomingMessage, res: ServerResponse, parsedUrl?: Url) => Promise<any>;
    type KoaHandleFunction = () => Promise<any>;

    async function nextOrCustomRouteHandler(app: any, handle: NextHandleFunction, ctx: Context, next: KoaHandleFunction) {
        if (!app || !handle) {
            await next();
            return;
        }

        const parsed = parse(ctx.req.url, true);
        const pathComps = parsed.pathname.split('/').filter(str => str);
        if (pathComps[0] === 'plugins') {
            await next();
            return;
        }

        const routesSet = app.router.routes.get(ctx.method) as Set<NextRoute>
        const routes = [...routesSet];
        const found = routes.some(route => !!route.match(parsed.pathname));
        if (found) {
            await handle(ctx.req, ctx.res, parsed);
            ctx.respond = false;
            return;
        }
        await next();
    }

    export function routers(app, handle: NextHandleFunction) {
        const router = new Router();
        router.get('*', nextOrCustomRouteHandler.bind(nextOrCustomRouteHandler, app, handle));
        return [router];
    }
}
export default Site;