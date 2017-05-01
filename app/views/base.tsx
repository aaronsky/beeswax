import * as React from 'react';

interface BaseLayoutProps {
    title: string;
    description: string;
}

export class BaseLayoutView extends React.Component<BaseLayoutProps, {}> {
    render() {
        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <meta charSet='utf-8' />
                    <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                    <meta name='description' content={this.props.description} />
                    <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' />
                </head>
                <body>
                    {this.props.children}
                    <script src='/scripts/client.bundle.js' />
                </body>
            </html>
        )
    }
}