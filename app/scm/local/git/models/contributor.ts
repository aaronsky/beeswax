import { BumblePluginModel } from '../../../../plugins/models';
import { Contributor as BumbleContributor } from '../../../models';

export interface Contributor {
    id: number;
    name: string;
    username: string;
    email: string;
    url: string;
    avatar_url: string;
    type: string;
}

export class Contributor extends BumblePluginModel<BumbleContributor> {
    constructor(model?: BumbleContributor) {
        super(model);
    }
    toModel() {
        const bumbleModel = new BumbleContributor();
        return bumbleModel;
    }
}