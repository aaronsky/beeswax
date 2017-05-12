import * as glob from 'glob';
import * as Router from 'koa-router';
import * as _ from 'lodash';
import * as path from 'path';

import PluginModel from './model';
import PluginService from './service';

namespace Plugins {
    let plugins: PluginService[] = loadPlugins();
    export function loadPlugins(): PluginService[] {
        const dirs = glob.sync('./beeswax-plugin-*/', {
            cwd: __dirname
        });
        return dirs.map(dir => {
            const pluginName = dir.slice(2, -1);
            const pluginPath = path.resolve(__dirname, dir);
            console.log('Loading plugin', pluginName, 'at', pluginPath);
            let cls = require(pluginPath);
            cls = cls.default || cls;
            return new cls();
        });
    }
    export function routers(app, handle: (req, res) => Promise<any>): Router[] {
        return plugins.map(plugin => plugin.router(app, handle));
    }
}
export default Plugins;
export {
    PluginModel,
    PluginService
}