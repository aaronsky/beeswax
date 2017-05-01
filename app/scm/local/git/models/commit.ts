import { Contributor } from './contributor';
import { BumblePluginModel } from '../../../../plugins/models';
import { Commit as BumbleCommit } from '../../../models';

export interface Commit {
    id: string;
    treeId: string;
    distinct: boolean;
    message: string;
    timestamp: string;
    url: string;
    author: Contributor;
    committer: Contributor;
    addedFiles: string[];
    removedFiles: string[];
    modifiedFiles: string[];
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