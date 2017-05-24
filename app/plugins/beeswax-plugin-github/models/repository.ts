import * as moment from 'moment';
import { URL } from 'url';

import { Contributor } from './contributor';
import PluginModel from '../../model';
import { Repository as BeeswaxRepository } from '../../../core/models';

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

export class Repository extends PluginModel<BeeswaxRepository> {
    constructor(model?: BeeswaxRepository) {
        super(model);
    }
    toModel() {
        const model = new BeeswaxRepository();
        model.id = this.id;
        model.name = this.name;
        model.fullName = this.full_name;
        model.owner = this.owner.toModel();
        model.private = this.private;
        model.url = new URL(this.html_url);
        model.description = this.description;
        model.created = moment(this.created_at);
        model.updated = moment(this.updated_at);
        model.lastPushed = moment(this.pushed_at);
        model.gitUrl = new URL(this.git_url);
        model.size = this.size;
        model.defaultBranch = this.default_branch;
        return model;
    }
}