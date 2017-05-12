import * as dotenv from 'dotenv';

import createServer from './server';

dotenv.config();

async function start() {
    const server = await createServer();
}
start();
