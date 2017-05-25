import * as glob from 'glob';
import * as Router from 'koa-router';
import * as _ from 'lodash';
import * as os from 'os';
import * as path from 'path';

import PluginModel from './model';
import PluginService from './service';

namespace Plugins {
    let plugins: PluginService[] = loadPlugins();
    export function loadPlugins(overridePath: string = null): PluginService[] {
        const paths = {
            builtIn: path.resolve(__dirname),
            default: path.resolve(os.homedir(), '.beeswax', 'plugins'),
            personal: overridePath
        };
        return Object.keys(paths)
            .map((key) => paths[key])
            .filter(path => path)
            .map((path) => glob.sync('./beeswax-plugin-*/', { cwd: path }).map(loadPluginAtPath.bind(null, path)))
            .reduce((acc, plugins) => [...acc, ...plugins], []);
    }
    function loadPluginAtPath(parentDir: string, dirName: string): PluginService {
        const pluginName = dirName.slice(2, -1);
        const pluginPath = path.resolve(parentDir, dirName);
        console.log('Loading plugin', pluginName, 'at', pluginPath);
        let cls = require(pluginPath);
        cls = cls.default || cls;
        return new cls();
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