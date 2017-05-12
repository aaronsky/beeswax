import * as koa from 'koa';
import * as compose from 'koa-compose';
import * as Router from 'koa-router';
import * as _ from 'lodash';

import Site from './site';
import Plugins from '../../plugins';

export function combineRouters(routers: Router[]) {
    const middleware = _.flatMap(routers, router => [router.routes(), router.allowedMethods()]);
    return compose(middleware);
}

export default function routes(app, handle) {
    return combineRouters([
        ...Site.routers(app, handle),
        ...Plugins.routers(app, handle)
    ]);
};