import * as React from 'react';

import Head from '../components/head';
import Header from '../components/header';
import App from '../components/app';

export default () =>
    <div>
        <Head title="Home" description="busy bee" />
        <Header>
            <h1>Hello world</h1>
        </Header>
        <App />
    </div>