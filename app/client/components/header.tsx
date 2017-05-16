import * as React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import * as NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = (url) => {
    console.log('Loading:', url);
    NProgress.start();
}
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const linkStyle = {
    margin: '0 10px 0 0'
};

interface HeaderProps {
    children?: any;
}

export default (props: HeaderProps) =>
    <div style={{ marginBottom: 20 }}>
        {props.children}
        <Link href='/'><a style={linkStyle}>Home</a></Link>
        <Link href='/about'><a style={linkStyle}>About</a></Link>
        <Link href='/forever'><a style={linkStyle}>Forever</a></Link>
        <Link href='/non-existing'><a style={linkStyle}>Non Existing Page</a></Link>
    </div>