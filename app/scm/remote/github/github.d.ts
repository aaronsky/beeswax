declare namespace Github {
    export interface IRepository {
        id: number;
        name: string;
        full_name: string;
        owner: IContributor;
        private: boolean;
        html_url: URL;
        description: string;
        fork: boolean;
        created_at: number;
        updated_at: string;
        pushed_at: number;
        git_url: URL;
        size: number;
        language: string;
        default_branch: string;
        master_branch: string;
    }
    export type UserType = 'User';
    export interface IContributor {
        name: string;
        email: string;
        date?: string;
        html_url?: URL;
        avatar_url?: URL;
        type?: UserType;
    }
    export interface ICommit {
        id: string;
        tree_id: string;
        distinct: boolean;
        message: string;
        timestamp: string;
        url: URL;
        author: IContributor;
        committer: IContributor;
        added: string[];
        removed: string[];
        modified: string[];
    }
}