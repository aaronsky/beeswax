import * as moment from 'moment';
import { Contributor } from './contributor';
import { BeeswaxPluginModel } from '../../../../plugins/models';
import { Repository as BeeswaxRepository } from '../../../models';

export interface Repository {
    id: number;
    name: string;
    full_name: string;
    owner: Contributor;
    private: boolean;
    html_url: string;
    description: string;
    fork: boolean;
    created_at: number;
    updated_at: string;
    pushed_at: number;
    git_url: string;
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