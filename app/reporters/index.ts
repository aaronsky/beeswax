import Slack from './slack';
import { BumblePluginService } from '../plugins/models';

namespace Reporters {
    export const services: BumblePluginService[] = [
        new Slack()
    ];
    export function routers() {
        return services.map(service => service.router);
    }
}
export default Reporters;