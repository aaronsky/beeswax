import PluginModel from '../../model';
import { Contributor as BeeswaxContributor } from '../../../core/models';

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

export class Contributor extends PluginModel<BeeswaxContributor> {
    constructor(model?: BeeswaxContributor) {
        super(model);
    }
    toModel() {
        const beeswaxModel = new BeeswaxContributor();
        return beeswaxModel;
    }
}