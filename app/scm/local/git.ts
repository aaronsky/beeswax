import * as moment from 'moment';
import * as git from 'nodegit';

namespace Git {
    export class Repository {
        id: number;
        name: string;
        fullName: string;
        owner: Contributor;
        private: boolean;
        url: URL;
        description: string;
        fork: boolean;
        createdAt: moment.Moment;
        updatedAt: moment.Moment;
        pushedAt: moment.Moment;
        gitUrl: URL;
        size: number;
        language: string;
        defaultBranch: string;
        masterBranch: string;

        constructor();
        constructor(data: Github.IRepository);
        constructor(data?: any) {
            if (data) {
                this.id = data.id;
                this.name = data.name;
                this.fullName = data.full_name;
                this.owner = new Contributor(data.owner);
                this.private = data.private;
                this.url = new URL(data.html_url);
                this.description = data.description;
                this.fork = data.fork;
                this.createdAt = moment(data.created_at);
                this.updatedAt = moment(data.updated_at);
                this.pushedAt = moment(data.pushed_at);
                this.gitUrl = data.git_url;
                this.size = data.size;
                this.language = data.language;
                this.defaultBranch = data.default_branch;
                this.masterBranch = data.master_branch;
            }
        }
    }

    export class Contributor {
        id: number;
        name: string;
        email: string;
        url: URL;
        avatarUrl: URL;
        type: Github.UserType;

        constructor();
        constructor(data: Github.IContributor);
        constructor(data?: any) {
            if (data) {
                this.id = data.id;
                this.name = data.name;
                this.email = data.email;
                this.url = new URL(data.html_url);
                this.avatarUrl = new URL(data.avatar_url);
                this.type = data.type;
            }
        }
    }

    export class Commit {
        id: string;
        treeId: string;
        distinct: boolean;
        message: string;
        timestamp: moment.Moment;
        url: URL;
        author: Contributor;
        committer: Contributor;
        addedFiles: string[];
        removedFiles: string[];
        modifiedFiles: string[];

        constructor();
        constructor(data: Github.ICommit);
        constructor(data?: any) {
            if (data) {
                this.id = data.id;
                this.treeId = data.tree_id;
                this.distinct = data.distinct;
                this.message = data.message;
                this.timestamp = moment(data.timestamp);
                this.url = data.url;
                this.author = new Contributor(data.author);
                this.committer = new Contributor(data.committer);
                this.addedFiles = data.added;
                this.removedFiles = data.removed;
                this.modifiedFiles = data.modified;
            }
        }
    }
}

export default Git;