import * as moment from 'moment';
import { URL } from 'url';

import { Contributor } from './contributor';
import PluginModel from '../../model';
import { Commit as BeeswaxCommit } from '../../../core/models';

export interface Commit {
    id: string;
    tree_id: string;
    distinct: boolean;
    message: string;
    timestamp: string;
    url: string;
    author: Contributor;
    committer: Contributor;
    added: string[];
    removed: string[];
    modified: string[];
}

export class Commit extends PluginModel<BeeswaxCommit> {
    constructor(model?: BeeswaxCommit) {
        super(model);
    }
    toModel() {
        const model = new BeeswaxCommit();
        model.id = this.id;
        model.treeId = this.tree_id;
        model.message = this.message;
        model.timestamp = moment(this.timestamp);
        model.url = new URL(this.url);
        model.author = this.author.toModel();
        model.added = this.added;
        model.removed = this.removed;
        model.modified = this.modified;
        return model;
    }
}