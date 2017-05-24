import * as moment from 'moment';
import { URL } from 'url';

import PluginModel from '../../model';
import { Contributor as BeeswaxContributor } from '../../../core/models';

export interface Contributor {
    id?: number;
    name: string;
    email: string;
    username?: string;
    date?: string;
    html_url?: string;
    avatar_url?: string;
    type?: string;
}

export class Contributor extends PluginModel<BeeswaxContributor> {
    constructor(model?: BeeswaxContributor) {
        super(model);
    }
    toModel() {
        const model = new BeeswaxContributor();
        model.id = this.id;
        model.name = this.name;
        model.email = this.email;
        model.username = this.username;
        model.date = moment(this.date);
        model.url = new URL(this.html_url);
        model.avatarUrl = new URL(this.avatar_url);
        model.role = this.type;
        return model;
    }
}