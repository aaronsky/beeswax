import * as glob from 'glob';
import * as path from 'path';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

namespace Views {
    const viewClasses: { [index: string]: React.ComponentClass<object> } = glob.sync('./views/*.tsx', {
        cwd: __dirname
    }).reduce((acc, dir) => {
        const viewPath = path.resolve(__dirname, dir);
        const viewName = path.basename(viewPath, path.extname(viewPath));
        console.log('Loading view', viewName, 'at', viewPath);
        const cls = require(viewPath);
        return {
            ...acc,
            [viewName]: cls.default || cls
        };
    }, {});
    export function toMarkup(view: string, options?: object): string {
        if (!(view in viewClasses)) {
            throw new Error('View could not be found');
        }
        return renderView(viewClasses[view], options);
    }
    function renderView<T extends object>(cls: React.ComponentClass<T>, options?: object): string {
        return ReactDOMServer.renderToString(React.createElement<object>(cls, options));
    }
}
export default Views;