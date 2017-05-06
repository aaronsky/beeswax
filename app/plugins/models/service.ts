import * as Router from 'koa-router';

abstract class BeeswaxPluginService {
    router: Router;
    constructor() {
        this.router = new Router();
        this.setupRoutes();
    }
    protected abstract setupRoutes(): void;
}
export default BeeswaxPluginService;