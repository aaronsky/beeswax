import * as Router from 'koa-router';
import * as nodegit from 'nodegit';
import { URL } from 'url';

import PluginService from '../service';

export default class Git extends PluginService {
    router(app): Router {
        const router = new Router();
        return router;
    }
}