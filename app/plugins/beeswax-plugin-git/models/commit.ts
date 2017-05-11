import { Contributor } from './contributor';
import PluginModel from '../../model';
import { Commit as BeeswaxCommit } from '../../../core/models';

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

export class Commit extends PluginModel<BeeswaxCommit> {
    constructor(model?: BeeswaxCommit) {
        super(model);
    }
    toModel() {
        const beeswaxModel = new BeeswaxCommit();
        return beeswaxModel;
    }
}