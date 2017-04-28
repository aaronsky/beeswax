import * as remote from './remote';

namespace SCM {
    export function emit(eventName, ...args) {
        console.log.apply(console, arguments);
    }
    export function routers() {
        return [
            ...remote.routes()
        ];
    }
}

export default SCM;