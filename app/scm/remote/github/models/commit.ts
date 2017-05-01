import { Contributor } from './contributor';
import { BumblePluginModel } from '../../../../plugins/models';
import { Commit as BumbleCommit } from '../../../models';

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

export class Commit extends BumblePluginModel<BumbleCommit> {
    constructor(model?: BumbleCommit) {
        super(model);
    }
    toModel() {
        const bumbleModel = new BumbleCommit();
        return bumbleModel;
    }
}