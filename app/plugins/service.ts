import * as Router from 'koa-router';

abstract class PluginService {
    router: Router;
    constructor() {
        this.router = new Router();
    }
}
export default PluginService;