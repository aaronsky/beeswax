import * as moment from 'moment';
import { Contributor } from './contributor';
import { BumblePluginModel } from '../../../../plugins/models';
import { Repository as BumbleRepository } from '../../../models';

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

export class Repository extends BumblePluginModel<BumbleRepository> {
    constructor(model?: BumbleRepository) {
        super(model);
    }
    toModel() {
        const bumbleModel = new BumbleRepository();
        return bumbleModel;
    }
}