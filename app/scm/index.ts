import * as remote from './remote';

namespace SCM {
    export function routers() {
        return [
            ...remote.routers()
        ];
    }
}

export default SCM;