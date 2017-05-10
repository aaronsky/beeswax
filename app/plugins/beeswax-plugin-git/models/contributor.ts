import { BeeswaxPluginModel } from '../../../../plugins/models';
import { Contributor as BeeswaxContributor } from '../../../models';

export interface Contributor {
    id: number;
    name: string;
    username: string;
    email: string;
    url: string;
    avatar_url: string;
    type: string;
}

export class Contributor extends BeeswaxPluginModel<BeeswaxContributor> {
    constructor(model?: BeeswaxContributor) {
        super(model);
    }
    toModel() {
        const beeswaxModel = new BeeswaxContributor();
        return beeswaxModel;
    }
}