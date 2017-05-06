import Github from './github';
import { BeeswaxPluginService } from '../../plugins/models';

export const services: BeeswaxPluginService[] = [
    new Github()
];
export function routers() {
    return services.map(service => service.router);
}