import { BumblePluginModel } from '../../../../plugins/models';
import { Contributor as BumbleContributor } from '../../../models';

export interface Contributor {
    id?: number;
    name: string;
    email: string;
    username?: string;
    date?: string;
    html_url?: string;
    avatar_url?: string;
    type?: string;
}

export class Contributor extends BumblePluginModel<BumbleContributor> {
    constructor(model?: BumbleContributor) {
        super(model);
    }
    toModel() {
        const beeswaxModel = new BumbleContributor();
        return beeswaxModel;
    }
}