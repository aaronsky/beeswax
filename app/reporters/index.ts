import Slack from './slack';
import { BeeswaxPluginService } from '../plugins/models';

namespace Reporters {
    export const services: BeeswaxPluginService[] = [
        new Slack()
    ];
    export function routers() {
        return services.map(service => service.router);
    }
}
export default Reporters;