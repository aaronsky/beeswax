import * as Router from 'koa-router';

abstract class PluginService {
    abstract router(app, handle?: (req, res) => Promise<any>): Router;
}
export default PluginService;