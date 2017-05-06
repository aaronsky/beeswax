import { Contributor } from './contributor';
import { BeeswaxPluginModel } from '../../../../plugins/models';
import { Commit as BeeswaxCommit } from '../../../models';

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

export class Commit extends BeeswaxPluginModel<BeeswaxCommit> {
    constructor(model?: BeeswaxCommit) {
        super(model);
    }
    toModel() {
        const beeswaxModel = new BeeswaxCommit();
        return beeswaxModel;
    }
}