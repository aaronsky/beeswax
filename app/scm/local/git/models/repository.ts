import * as moment from 'moment';
import { Contributor } from './contributor';
import { BumblePluginModel } from '../../../../plugins/models';
import { Repository as BumbleRepository } from '../../../models';

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

export class Repository extends BumblePluginModel<BumbleRepository> {
    constructor(model?: BumbleRepository) {
        super(model);
    }
    toModel() {
        const bumbleModel = new BumbleRepository();
        return bumbleModel;
    }
}