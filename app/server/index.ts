import * as koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as react from 'koa-react-view';
import * as staticCache from 'koa-static-cache';
import * as path from 'path';

import routes from './routes';

export default function start() {
    const clientPath = path.resolve(__dirname, '..', 'client');
    const viewsPath = path.resolve(clientPath, 'views');
    const publicPath = path.resolve(clientPath, 'public');

    const app = new koa();

    app.use(bodyParser());
    app.use(routes);
    app.use(staticCache(publicPath));

    const server = app.listen(process.env.BEESWAX_PORT, process.env.BEESWAX_HOST, () => {
        console.log('Server listening on %s:%s', server.address().address, server.address().port);
    });
    server.on('close', () => {
        console.log('Shutting down server...');
    });
    return server;
}