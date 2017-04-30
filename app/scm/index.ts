import * as remote from './remote';

namespace SCM {
    export function routers() {
        return [
            ...remote.routes()
        ];
    }
}

export default SCM;