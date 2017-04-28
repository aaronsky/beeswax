declare namespace Github {
    export interface IRepository {
        id: number;
        name: string;
        full_name: string;
        owner: IContributor;
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
    export type UserType = 'User';
    export interface IContributor {
        id?: number;
        name: string;
        email: string;
        username?: string;
        date?: string;
        html_url?: string;
        avatar_url?: string;
        type?: UserType;
    }
    export interface ICommit {
        id: string;
        tree_id: string;
        distinct: boolean;
        message: string;
        timestamp: string;
        url: string;
        author: IContributor;
        committer: IContributor;
        added: string[];
        removed: string[];
        modified: string[];
    }
}