import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { BaseLayoutView } from './base';

export default class ErrorView extends React.Component<object, object> {
    render() {
        return (
            <BaseLayoutView
                title='Beeswax | Error'
                description='Something went wrong!'>
                <div>
                    <p>FAILURE</p>
                </div>
            </BaseLayoutView>
        )
    }
}