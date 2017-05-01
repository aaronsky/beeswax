import Github from './github';
import { BumblePluginService } from '../../plugins/models';

export const services: BumblePluginService[] = [
    new Github()
];
export function routers() {
    return services.map(service => service.router);
}