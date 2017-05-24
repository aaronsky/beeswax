import * as moment from 'moment';
import { URL } from 'url';

import Contributor from './contributor';

export default class Repository {
    id: number;
    name: string;
    fullName: string;
    owner: Contributor;
    private: boolean;
    url: URL;
    description: string;
    created: moment.Moment;
    updated: moment.Moment;
    lastPushed: moment.Moment;
    gitUrl: URL;
    size: number;
    defaultBranch: string;
}