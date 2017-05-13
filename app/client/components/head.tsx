import * as React from "react";
import Head from "next/head";

interface HeadProps {
    title: string;
    description: string;
}
export default (props: HeadProps) =>
    <Head>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link rel="icon" type="image/png" href="/static/img/favicon.png" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="stylesheet" href="/static/css/main.css" />
    </Head>