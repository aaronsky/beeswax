import * as moment from 'moment';
import { URL } from 'url';

export default class Contributor {
    id: number;
    name: string;
    email: string;
    username: string;
    date: moment.Moment;
    url: URL;
    avatarUrl: URL;
    role: string;
}