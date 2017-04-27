import * as koa from 'koa';
import * as compose from 'koa-compose';
import * as Router from 'koa-router';
import * as _ from 'lodash';

export function combineRouters(routers: Router[]) {
    const middleware = _.flatMap(routers, router => {
        return [
            router.routes(),
            router.allowedMethods()
        ];
    });

    return compose(middleware);
}