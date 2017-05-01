import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { App } from '../public/scripts/app';
import { BaseLayoutView } from './base';

export default class IndexView extends React.Component<{}, {}> {
    render() {
        const contentString = ReactDOMServer.renderToStaticMarkup(<App />);
        return (
            <BaseLayoutView
                title='Bumble | Home'
                description='Modular CI task automation and reporting'>
                <div id='content' dangerouslySetInnerHTML={{ __html: contentString }} />
            </BaseLayoutView>
        )
    }
}