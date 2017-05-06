import * as dotenv from 'dotenv';
import * as koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as react from 'koa-react-view';
import * as staticCache from 'koa-static-cache';
import * as path from 'path';

dotenv.config();

import routes from './routes';

const viewsPath = path.resolve(__dirname, 'views');
const publicPath = path.resolve(__dirname, 'public');

const app = new koa();
react(app, {
    extname: 'js',
    views: viewsPath
});

app.use(bodyParser());
app.use(routes);
app.use(staticCache(publicPath));

const server = app.listen(process.env.BUMBLE_PORT, process.env.BUMBLE_HOST, () => {
    console.log('Server listening on %s:%s', server.address().address, server.address().port);
});