import * as koa from 'koa';
import * as compose from 'koa-compose';
import * as Router from 'koa-router';
import * as _ from 'lodash';

import Site from './site';
import Plugins from '../../plugins';

export function combineRouters(routers: Router[]) {
    const middleware = _.flatMap(routers, router => {
        return [
            router.routes(),
            router.allowedMethods()
        ];
    });

    return compose(middleware);
}

const routes = combineRouters([
    ...Plugins.routers(),
    ...Site.routers()
]);

export default routes;