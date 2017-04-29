import * as request from 'request';
import { URL } from 'url';

export namespace WebApi {
    const rootUri = new URL('https://slack.com/');
    const apiUri = new URL('api', rootUri);
    async function callApi<T extends Slack.WebApi.Response>(method: string, opts: object): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const callUri = new URL(method, apiUri);
            request.post(callUri.href, (error, response, body) => {
                if (error || response.statusCode !== 200) {
                    reject(error);
                    return;
                }
                resolve(body);
            });
        });
    }

    export const api = {
        test: (opts: Slack.WebApi.ApiTestParameters) => {
            return callApi<Slack.WebApi.ApiTestResponse>('api.test', opts);
        }
    };

    export const auth = {
        revoke: (opts: Slack.WebApi.AuthRevokeParameters) => {
            return callApi<Slack.WebApi.AuthRevokeResponse>('auth.revoke', opts);
        },
        test: (opts: Slack.WebApi.AuthTestParameters) => {
            return callApi<Slack.WebApi.AuthTestResponse>('auth.test', opts);
        }
    };

    export const bots = {
        info: (opts: Slack.WebApi.BotsInfoParameters) => {
            return callApi<Slack.WebApi.BotsInfoResponse>('bots.info', opts);
        }
    };

    export const channels = {
        archive: (opts: Slack.WebApi.ChannelsArchiveParameters) => {
            return callApi<Slack.WebApi.ChannelsArchiveResponse>('channels.archive', opts);
        },
        create: (opts: Slack.WebApi.ChannelsCreateParameters) => {
            return callApi<Slack.WebApi.ChannelsCreateResponse>('channels.create', opts);
        },
        history: (opts: Slack.WebApi.ChannelsHistoryParameters) => {
            return callApi<Slack.WebApi.ChannelsHistoryResponse>('channels.history', opts);
        },
        info: (opts: Slack.WebApi.ChannelsInfoParameters) => {
            return callApi<Slack.WebApi.ChannelsInfoResponse>('channels.info', opts);
        },
        invite: (opts: Slack.WebApi.ChannelsInviteParameters) => {
            return callApi<Slack.WebApi.ChannelsInviteResponse>('channels.invite', opts);
        },
        join: (opts: Slack.WebApi.ChannelsJoinParameters) => {
            return callApi<Slack.WebApi.ChannelsJoinResponse>('channels.join', opts);
        },
        kick: (opts: Slack.WebApi.ChannelsKickParameters) => {
            return callApi<Slack.WebApi.ChannelsKickResponse>('channels.kick', opts);
        },
        leave: (opts: Slack.WebApi.ChannelsLeaveParameters) => {
            return callApi<Slack.WebApi.ChannelsLeaveResponse>('channels.leave', opts);
        },
        list: (opts: Slack.WebApi.ChannelsListParameters) => {
            return callApi<Slack.WebApi.ChannelsListResponse>('channels.list', opts);
        },
        mark: (opts: Slack.WebApi.ChannelsMarkParameters) => {
            return callApi<Slack.WebApi.ChannelsMarkResponse>('channels.mark', opts);
        },
        rename: (opts: Slack.WebApi.ChannelsRenameParameters) => {
            return callApi<Slack.WebApi.ChannelsRenameResponse>('channels.rename', opts);
        },
        replies: (opts: Slack.WebApi.ChannelsRepliesParameters) => {
            return callApi<Slack.WebApi.ChannelsRepliesResponse>('channels.replies', opts);
        },
        setPurpose: (opts: Slack.WebApi.ChannelsSetPurposeParameters) => {
            return callApi<Slack.WebApi.ChannelsSetPurposeResponse>('channels.setPurpose', opts);
        },
        setTopic: (opts: Slack.WebApi.ChannelsSetTopicParameters) => {
            return callApi<Slack.WebApi.ChannelsSetTopicResponse>('channels.setTopic', opts);
        },
        unarchive: (opts: Slack.WebApi.ChannelsUnarchiveParameters) => {
            return callApi<Slack.WebApi.ChannelsUnarchiveResponse>('channels.unarchive', opts);
        }
    };

    export const chat = {
        delete: (opts: Slack.WebApi.ChatDeleteParameters) => {
            return callApi<Slack.WebApi.ChatDeleteResponse>('chat.delete', opts);
        },
        meMessage: (opts: Slack.WebApi.ChatMeMessageParameters) => {
            return callApi<Slack.WebApi.ChatMeMessageResponse>('chat.meMessage', opts);
        },
        postMessage: (opts: Slack.WebApi.ChatPostMessageParameters) => {
            return callApi<Slack.WebApi.ChatPostMessageResponse>('chat.postMessage', opts);
        },
        unfurl: (opts: Slack.WebApi.ChatUnfurlParameters) => {
            return callApi<Slack.WebApi.ChatUnfurlResponse>('chat.unfurl', opts);
        },
        update: (opts: Slack.WebApi.ChatUpdateParameters) => {
            return callApi<Slack.WebApi.ChatUpdateResponse>('chat.update', opts);
        }
    };

    export const dnd = {
        endDnd: (opts: Slack.WebApi.DndEndDndParameters) => {
            return callApi<Slack.WebApi.DndEndDndResponse>('dnd.endDnd', opts);
        },
        endSnooze: (opts: Slack.WebApi.DndEndSnoozeParameters) => {
            return callApi<Slack.WebApi.DndEndSnoozeResponse>('dnd.endSnooze', opts);
        },
        info: (opts: Slack.WebApi.DndInfoParameters) => {
            return callApi<Slack.WebApi.DndInfoResponse>('dnd.info', opts);
        },
        setSnooze: (opts: Slack.WebApi.DndSetSnoozeParameters) => {
            return callApi<Slack.WebApi.DndSetSnoozeResponse>('dnd.setSnooze', opts);
        },
        teamInfo: (opts: Slack.WebApi.DndTeamInfoParameters) => {
            return callApi<Slack.WebApi.DndTeamInfoResponse>('dnd.teamInfo', opts);
        }
    };

    export const emoji = {
        list: (opts: Slack.WebApi.EmojiListParameters) => {
            return callApi<Slack.WebApi.EmojiListResponse>('emoji.list', opts);
        }
    };

    export const files = {
        comments: {
            add: (opts: Slack.WebApi.FilesCommentsAddParameters) => {
                return callApi<Slack.WebApi.FilesCommentsAddResponse>('files.comments.add', opts);
            },
            delete: (opts: Slack.WebApi.FilesCommentsDeleteParameters) => {
                return callApi<Slack.WebApi.FilesCommentsDeleteResponse>('files.comments.delete', opts);
            },
            edit: (opts: Slack.WebApi.FilesCommentsEditParameters) => {
                return callApi<Slack.WebApi.FilesCommentsEditResponse>('files.comments.edit', opts);
            }
        },
        delete: (opts: Slack.WebApi.FilesDeleteParameters) => {
            return callApi<Slack.WebApi.FilesDeleteResponse>('files.delete', opts);
        },
        info: (opts: Slack.WebApi.FilesInfoParameters) => {
            return callApi<Slack.WebApi.FilesInfoResponse>('files.info', opts);
        },
        list: (opts: Slack.WebApi.FilesListParameters) => {
            return callApi<Slack.WebApi.FilesListResponse>('files.list', opts);
        },
        revokePublicURL: (opts: Slack.WebApi.FilesRevokePublicUrlParameters) => {
            return callApi<Slack.WebApi.FilesRevokePublicUrlResponse>('files.revokePublicURL', opts);
        },
        sharedPublicURL: (opts: Slack.WebApi.FilesSharedPublicUrlParameters) => {
            return callApi<Slack.WebApi.FilesSharedPublicUrlResponse>('files.sharedPublicURL', opts);
        },
        upload: (opts: Slack.WebApi.FilesUploadParameters) => {
            return callApi<Slack.WebApi.FilesUploadResponse>('files.upload', opts);
        }
    };

    export const groups = {
        archive: (opts: Slack.WebApi.GroupsArchiveParameters) => {
            return callApi<Slack.WebApi.GroupsArchiveResponse>('groups.archive', opts);
        },
        close: (opts: Slack.WebApi.GroupsCloseParameters) => {
            return callApi<Slack.WebApi.GroupsCloseResponse>('groups.close', opts);
        },
        create: (opts: Slack.WebApi.GroupsCreateParameters) => {
            return callApi<Slack.WebApi.GroupsCreateResponse>('groups.create', opts);
        },
        createChild: (opts: Slack.WebApi.GroupsCreateChildParameters) => {
            return callApi<Slack.WebApi.GroupsCreateChildResponse>('groups.createChild', opts);
        },
        history: (opts: Slack.WebApi.GroupsHistoryParameters) => {
            return callApi<Slack.WebApi.GroupsHistoryResponse>('groups.history', opts);
        },
        info: (opts: Slack.WebApi.GroupsInfoParameters) => {
            return callApi<Slack.WebApi.GroupsInfoResponse>('groups.info', opts);
        },
        invite: (opts: Slack.WebApi.GroupsInviteParameters) => {
            return callApi<Slack.WebApi.GroupsInviteResponse>('groups.invite', opts);
        },
        kick: (opts: Slack.WebApi.GroupsKickParameters) => {
            return callApi<Slack.WebApi.GroupsKickResponse>('groups.kick', opts);
        },
        leave: (opts: Slack.WebApi.GroupsLeaveParameters) => {
            return callApi<Slack.WebApi.GroupsLeaveResponse>('groups.leave', opts);
        },
        list: (opts: Slack.WebApi.GroupsListParameters) => {
            return callApi<Slack.WebApi.GroupsListResponse>('groups.list', opts);
        },
        mark: (opts: Slack.WebApi.GroupsMarkParameters) => {
            return callApi<Slack.WebApi.GroupsMarkResponse>('groups.mark', opts);
        },
        open: (opts: Slack.WebApi.GroupsOpenParameters) => {
            return callApi<Slack.WebApi.GroupsOpenResponse>('groups.open', opts);
        },
        rename: (opts: Slack.WebApi.GroupsRenameParameters) => {
            return callApi<Slack.WebApi.GroupsRenameResponse>('groups.rename', opts);
        },
        replies: (opts: Slack.WebApi.GroupsRepliesParameters) => {
            return callApi<Slack.WebApi.GroupsRepliesResponse>('groups.replies', opts);
        },
        setPurpose: (opts: Slack.WebApi.GroupsSetPurposeParameters) => {
            return callApi<Slack.WebApi.GroupsSetPurposeResponse>('groups.setPurpose', opts);
        },
        setTopic: (opts: Slack.WebApi.GroupsSetTopicParameters) => {
            return callApi<Slack.WebApi.GroupsSetTopicResponse>('groups.setTopic', opts);
        },
        unarchive: (opts: Slack.WebApi.GroupsUnarchiveParameters) => {
            return callApi<Slack.WebApi.GroupsUnarchiveResponse>('groups.unarchive', opts);
        }
    };

    export const im = {
        close: (opts: Slack.WebApi.ImCloseParameters) => {
            return callApi<Slack.WebApi.ImCloseResponse>('im.close', opts);
        },
        history: (opts: Slack.WebApi.ImHistoryParameters) => {
            return callApi<Slack.WebApi.ImHistoryResponse>('im.history', opts);
        },
        list: (opts: Slack.WebApi.ImListParameters) => {
            return callApi<Slack.WebApi.ImListResponse>('im.list', opts);
        },
        mark: (opts: Slack.WebApi.ImMarkParameters) => {
            return callApi<Slack.WebApi.ImMarkResponse>('im.mark', opts);
        },
        open: (opts: Slack.WebApi.ImOpenParameters) => {
            return callApi<Slack.WebApi.ImOpenResponse>('im.open', opts);
        },
        replies: (opts: Slack.WebApi.ImRepliesParameters) => {
            return callApi<Slack.WebApi.ImRepliesResponse>('im.replies', opts);
        }
    };

    export const mpim = {
        close: (opts: Slack.WebApi.MpimCloseParameters) => {
            return callApi<Slack.WebApi.MpimCloseResponse>('mpim.close', opts);
        },
        history: (opts: Slack.WebApi.MpimHistoryParameters) => {
            return callApi<Slack.WebApi.MpimHistoryResponse>('mpim.history', opts);
        },
        list: (opts: Slack.WebApi.MpimListParameters) => {
            return callApi<Slack.WebApi.MpimListResponse>('mpim.list', opts);
        },
        mark: (opts: Slack.WebApi.MpimMarkParameters) => {
            return callApi<Slack.WebApi.MpimMarkResponse>('mpim.mark', opts);
        },
        open: (opts: Slack.WebApi.MpimOpenParameters) => {
            return callApi<Slack.WebApi.MpimOpenResponse>('mpim.open', opts);
        },
        replies: (opts: Slack.WebApi.MpimRepliesParameters) => {
            return callApi<Slack.WebApi.MpimRepliesResponse>('mpim.replies', opts);
        }
    };

    export const oauth = {
        access: (opts: Slack.WebApi.OauthAccessParameters) => {
            return callApi<Slack.WebApi.OauthAccessResponse>('oauth.access', opts);
        }
    };

    export const pins = {
        add: (opts: Slack.WebApi.PinsAddParameters) => {
            return callApi<Slack.WebApi.PinsAddResponse>('pins.add', opts);
        },
        list: (opts: Slack.WebApi.PinsListParameters) => {
            return callApi<Slack.WebApi.PinsListResponse>('pins.list', opts);
        },
        remove: (opts: Slack.WebApi.PinsRemoveParameters) => {
            return callApi<Slack.WebApi.PinsRemoveResponse>('pins.remove', opts);
        }
    };

    export const reactions = {
        add: (opts: Slack.WebApi.ReactionsAddParameters) => {
            return callApi<Slack.WebApi.ReactionsAddResponse>('reactions.add', opts);
        },
        get: (opts: Slack.WebApi.ReactionsGetParameters) => {
            return callApi<Slack.WebApi.ReactionsGetResponse>('reactions.add', opts);
        },
        list: (opts: Slack.WebApi.ReactionsListParameters) => {
            return callApi<Slack.WebApi.ReactionsListResponse>('reactions.list', opts);
        },
        remove: (opts: Slack.WebApi.ReactionsRemoveParameters) => {
            return callApi<Slack.WebApi.ReactionsRemoveResponse>('reactions.remove', opts);
        }
    };

    export const reminders = {
        add: (opts: Slack.WebApi.RemindersAddParameters) => {
            return callApi<Slack.WebApi.RemindersAddResponse>('reminders.add', opts);
        },
        complete: (opts: Slack.WebApi.RemindersCompleteParameters) => {
            return callApi<Slack.WebApi.RemindersCompleteResponse>('reminders.complete', opts);
        },
        delete: (opts: Slack.WebApi.RemindersDeleteParameters) => {
            return callApi<Slack.WebApi.RemindersDeleteResponse>('reminders.delete', opts);
        },
        info: (opts: Slack.WebApi.RemindersInfoParameters) => {
            return callApi<Slack.WebApi.RemindersInfoResponse>('reminders.info', opts);
        },
        list: (opts: Slack.WebApi.RemindersListParameters) => {
            return callApi<Slack.WebApi.RemindersListResponse>('reminders.list', opts);
        },

    };

    export const rtm = {
        connect: (opts: Slack.WebApi.RtmConnectParameters) => {
            return callApi<Slack.WebApi.RtmConnectResponse>('rtm.connect', opts);
        },
        start: (opts: Slack.WebApi.RtmStartParameters) => {
            return callApi<Slack.WebApi.RtmStartResponse>('rtm.start', opts);
        }
    };

    export const search = {
        all: (opts: Slack.WebApi.SearchAllParameters) => {
            return callApi<Slack.WebApi.SearchAllResponse>('search.all', opts);
        },
        files: (opts: Slack.WebApi.SearchFilesParameters) => {
            return callApi<Slack.WebApi.SearchFilesResponse>('search.files', opts);
        },
        messages: (opts: Slack.WebApi.SearchMessagesParameters) => {
            return callApi<Slack.WebApi.SearchMessagesResponse>('search.messages', opts);
        }
    };

    export const stars = {
        add: (opts: Slack.WebApi.StarsAddParameters) => {
            return callApi<Slack.WebApi.StarsAddResponse>('stars.add', opts);
        },
        list: (opts: Slack.WebApi.StarsListParameters) => {
            return callApi<Slack.WebApi.StarsListResponse>('stars.list', opts);
        },
        remove: (opts: Slack.WebApi.StarsRemoveParameters) => {
            return callApi<Slack.WebApi.StarsRemoveResponse>('stars.remove', opts);
        }
    };

    export const team = {
        accessLogs: (opts: Slack.WebApi.TeamAccessLogsParameters) => {
            return callApi<Slack.WebApi.TeamAccessLogsResponse>('team.accessLogs', opts);
        },
        billableInfo: (opts: Slack.WebApi.TeamBillableInfoParameters) => {
            return callApi<Slack.WebApi.TeamBillableInfoResponse>('team.billableInfo', opts);
        },
        info: (opts: Slack.WebApi.TeamInfoParameters) => {
            return callApi<Slack.WebApi.TeamInfoResponse>('team.info', opts);
        },
        integrationLogs: (opts: Slack.WebApi.StarsAddParameters) => {
            return callApi<Slack.WebApi.StarsAddResponse>('team.integrationLogs', opts);
        },
        profile: {
            get: (opts: Slack.WebApi.TeamProfileGetParameters) => {
                return callApi<Slack.WebApi.TeamProfileGetResponse>('team.profile.get', opts);
            }
        }
    }

    export const usergroups = {
        create: (opts: Slack.WebApi.UsergroupsCreateParameters) => {
            return callApi<Slack.WebApi.UsergroupsCreateResponse>('usergroups.create', opts);
        },
        disable: (opts: Slack.WebApi.UsergroupsDisableParameters) => {
            return callApi<Slack.WebApi.UsergroupsDisableResponse>('usergroups.disable', opts);
        },
        enable: (opts: Slack.WebApi.UsergroupsEnableParameters) => {
            return callApi<Slack.WebApi.UsergroupsEnableResponse>('usergroups.enable', opts);
        },
        list: (opts: Slack.WebApi.UsergroupsListParameters) => {
            return callApi<Slack.WebApi.UsergroupsListResponse>('usergroups.list', opts);
        },
        update: (opts: Slack.WebApi.UsergroupsUpdateParameters) => {
            return callApi<Slack.WebApi.UsergroupsUpdateResponse>('usergroups.update', opts);
        },
        users: {
            list: (opts: Slack.WebApi.UsergroupsUsersListParameters) => {
                return callApi<Slack.WebApi.UsergroupsUsersListResponse>('usergroups.users.list', opts);
            },
            update: (opts: Slack.WebApi.UsergroupsUsersUpdateParameters) => {
                return callApi<Slack.WebApi.UsergroupsUsersUpdateResponse>('usergroups.users.update', opts);
            }
        }
    };

    export const users = {
        deletePhoto: (opts: Slack.WebApi.UsersDeletePhotoParameters) => {
            return callApi<Slack.WebApi.UsersDeletePhotoResponse>('users.deletePhoto', opts);
        },
        getPresence: (opts: Slack.WebApi.UsersGetPresenceParameters) => {
            return callApi<Slack.WebApi.UsersGetPresenceResponse>('users.getPresence', opts);
        },
        identity: (opts: Slack.WebApi.UsersIdentityParameters) => {
            return callApi<Slack.WebApi.UsersIdentityResponse>('users.identity', opts);
        },
        info: (opts: Slack.WebApi.UsersInfoParameters) => {
            return callApi<Slack.WebApi.UsersInfoResponse>('users.info', opts);
        },
        list: (opts: Slack.WebApi.UsersListParameters) => {
            return callApi<Slack.WebApi.UsersListResponse>('users.list', opts);
        },
        setActive: (opts: Slack.WebApi.UsersSetActiveParameters) => {
            return callApi<Slack.WebApi.UsersSetActiveResponse>('users.setActive', opts);
        },
        setPhoto: (opts: Slack.WebApi.UsersSetPhotoParameters) => {
            return callApi<Slack.WebApi.UsersSetPhotoResponse>('users.setPhoto', opts);
        },
        setPresence: (opts: Slack.WebApi.UsersSetPresenceParameters) => {
            return callApi<Slack.WebApi.UsersSetPresenceResponse>('users.setPresence', opts);
        },
        profile: {
            get: (opts: Slack.WebApi.UsersProfileGetParameters) => {
                return callApi<Slack.WebApi.UsersProfileGetResponse>('users.profile.get', opts);
            },
            set: (opts: Slack.WebApi.UsersProfileSetParameters) => {
                return callApi<Slack.WebApi.UsersProfileSetResponse>('users.profile.set', opts);
            }
        }
    };
}

export namespace EventsApi {

}