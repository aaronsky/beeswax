import * as fs from 'fs';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as next from 'next';
import * as path from 'path';

import routes from './routes';

const clientPath = path.resolve(__dirname, '..', 'client');
const staticPath = path.resolve(clientPath, 'static');

const dev = process.env.NODE_ENV === 'production';
const app = next({
    dev,
    dir: clientPath
});
const handle = app.getRequestHandler();

export default async function () {
    const staticFiles = fs.readdirSync(staticPath);
    await app.prepare();

    const server = new Koa()
        .use(bodyParser())
        .use(async (ctx, next) => {
            ctx.res.statusCode = 200;
            await next();
        })
        .use(routes(app, handle))
        .listen(process.env.BEESWAX_PORT, process.env.BEESWAX_HOST, () => {
            const address = server.address();
            console.log('Server listening on %s:%s', address.address, address.port);
        });
    return server;
}