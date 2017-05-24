import * as moment from 'moment';
import { URL } from 'url';

import Contributor from './contributor';

export default class Commit {
    id: string;
    treeId: string;
    message: string;
    timestamp: moment.Moment;
    url: URL;
    author: Contributor;
    added: string[];
    removed: string[];
    modified: string[];
}