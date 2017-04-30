import { Moment } from 'moment';

declare module git {
    export interface IRepository {
        id: number;
        name: string;
        fullName: string;
        owner: IContributor;
        private: boolean;
        url: URL;
        description: string;
        fork: boolean;
        createdAt: Moment;
        updatedAt: Moment;
        pushedAt: Moment;
        gitUrl: URL;
        size: number;
        language: string;
        defaultBranch: string;
        masterBranch: string;
    }

    export interface IContributor {
        id: number;
        name: string;
        username: string;
        email: string;
        url: URL;
        avatarUrl: URL;
        type: string;
    }

    export interface ICommit {
        id: string;
        treeId: string;
        distinct: boolean;
        message: string;
        timestamp: Moment;
        url: URL;
        author: IContributor;
        committer: IContributor;
        addedFiles: string[];
        removedFiles: string[];
        modifiedFiles: string[];
    }
}