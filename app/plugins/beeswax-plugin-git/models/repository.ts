import * as moment from 'moment';
import { Contributor } from './contributor';
import { BeeswaxPluginModel } from '../../../../plugins/models';
import { Repository as BeeswaxRepository } from '../../../models';

export interface Repository {
    id: number;
    name: string;
    fullName: string;
    owner: Contributor;
    private: boolean;
    url: URL;
    description: string;
    fork: boolean;
    created_at: moment.Moment;
    updated_at: moment.Moment;
    pushed_at: moment.Moment;
    git_url: URL;
    size: number;
    language: string;
    default_branch: string;
    master_branch: string;
}

export class Repository extends BeeswaxPluginModel<BeeswaxRepository> {
    constructor(model?: BeeswaxRepository) {
        super(model);
    }
    toModel() {
        const beeswaxModel = new BeeswaxRepository();
        return beeswaxModel;
    }
}