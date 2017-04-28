import Slack, { router as slackRouter } from './slack';

namespace Reporters {
    export function routers() {
        return [
            slackRouter
        ];
    }
}

export default Reporters;