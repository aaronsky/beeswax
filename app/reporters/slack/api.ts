import * as request from 'request';
import { URL } from 'url';
import { slack } from "./slack";

export namespace WebApi {
    const rootUri = new URL('https://slack.com/');
    const apiUri = new URL('api', rootUri);
    async function callApi<T extends slack.WebApi.Response>(method: string, opts: object): Promise<T> {
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
        test: (opts: slack.WebApi.ApiTestParameters) => {
            return callApi<slack.WebApi.ApiTestResponse>('api.test', opts);
        }
    };

    export const auth = {
        revoke: (opts: slack.WebApi.AuthRevokeParameters) => {
            return callApi<slack.WebApi.AuthRevokeResponse>('auth.revoke', opts);
        },
        test: (opts: slack.WebApi.AuthTestParameters) => {
            return callApi<slack.WebApi.AuthTestResponse>('auth.test', opts);
        }
    };

    export const bots = {
        info: (opts: slack.WebApi.BotsInfoParameters) => {
            return callApi<slack.WebApi.BotsInfoResponse>('bots.info', opts);
        }
    };

    export const channels = {
        archive: (opts: slack.WebApi.ChannelsArchiveParameters) => {
            return callApi<slack.WebApi.ChannelsArchiveResponse>('channels.archive', opts);
        },
        create: (opts: slack.WebApi.ChannelsCreateParameters) => {
            return callApi<slack.WebApi.ChannelsCreateResponse>('channels.create', opts);
        },
        history: (opts: slack.WebApi.ChannelsHistoryParameters) => {
            return callApi<slack.WebApi.ChannelsHistoryResponse>('channels.history', opts);
        },
        info: (opts: slack.WebApi.ChannelsInfoParameters) => {
            return callApi<slack.WebApi.ChannelsInfoResponse>('channels.info', opts);
        },
        invite: (opts: slack.WebApi.ChannelsInviteParameters) => {
            return callApi<slack.WebApi.ChannelsInviteResponse>('channels.invite', opts);
        },
        join: (opts: slack.WebApi.ChannelsJoinParameters) => {
            return callApi<slack.WebApi.ChannelsJoinResponse>('channels.join', opts);
        },
        kick: (opts: slack.WebApi.ChannelsKickParameters) => {
            return callApi<slack.WebApi.ChannelsKickResponse>('channels.kick', opts);
        },
        leave: (opts: slack.WebApi.ChannelsLeaveParameters) => {
            return callApi<slack.WebApi.ChannelsLeaveResponse>('channels.leave', opts);
        },
        list: (opts: slack.WebApi.ChannelsListParameters) => {
            return callApi<slack.WebApi.ChannelsListResponse>('channels.list', opts);
        },
        mark: (opts: slack.WebApi.ChannelsMarkParameters) => {
            return callApi<slack.WebApi.ChannelsMarkResponse>('channels.mark', opts);
        },
        rename: (opts: slack.WebApi.ChannelsRenameParameters) => {
            return callApi<slack.WebApi.ChannelsRenameResponse>('channels.rename', opts);
        },
        replies: (opts: slack.WebApi.ChannelsRepliesParameters) => {
            return callApi<slack.WebApi.ChannelsRepliesResponse>('channels.replies', opts);
        },
        setPurpose: (opts: slack.WebApi.ChannelsSetPurposeParameters) => {
            return callApi<slack.WebApi.ChannelsSetPurposeResponse>('channels.setPurpose', opts);
        },
        setTopic: (opts: slack.WebApi.ChannelsSetTopicParameters) => {
            return callApi<slack.WebApi.ChannelsSetTopicResponse>('channels.setTopic', opts);
        },
        unarchive: (opts: slack.WebApi.ChannelsUnarchiveParameters) => {
            return callApi<slack.WebApi.ChannelsUnarchiveResponse>('channels.unarchive', opts);
        }
    };

    export const chat = {
        delete: (opts: slack.WebApi.ChatDeleteParameters) => {
            return callApi<slack.WebApi.ChatDeleteResponse>('chat.delete', opts);
        },
        meMessage: (opts: slack.WebApi.ChatMeMessageParameters) => {
            return callApi<slack.WebApi.ChatMeMessageResponse>('chat.meMessage', opts);
        },
        postMessage: (opts: slack.WebApi.ChatPostMessageParameters) => {
            return callApi<slack.WebApi.ChatPostMessageResponse>('chat.postMessage', opts);
        },
        unfurl: (opts: slack.WebApi.ChatUnfurlParameters) => {
            return callApi<slack.WebApi.ChatUnfurlResponse>('chat.unfurl', opts);
        },
        update: (opts: slack.WebApi.ChatUpdateParameters) => {
            return callApi<slack.WebApi.ChatUpdateResponse>('chat.update', opts);
        }
    };

    export const dnd = {
        endDnd: (opts: slack.WebApi.DndEndDndParameters) => {
            return callApi<slack.WebApi.DndEndDndResponse>('dnd.endDnd', opts);
        },
        endSnooze: (opts: slack.WebApi.DndEndSnoozeParameters) => {
            return callApi<slack.WebApi.DndEndSnoozeResponse>('dnd.endSnooze', opts);
        },
        info: (opts: slack.WebApi.DndInfoParameters) => {
            return callApi<slack.WebApi.DndInfoResponse>('dnd.info', opts);
        },
        setSnooze: (opts: slack.WebApi.DndSetSnoozeParameters) => {
            return callApi<slack.WebApi.DndSetSnoozeResponse>('dnd.setSnooze', opts);
        },
        teamInfo: (opts: slack.WebApi.DndTeamInfoParameters) => {
            return callApi<slack.WebApi.DndTeamInfoResponse>('dnd.teamInfo', opts);
        }
    };

    export const emoji = {
        list: (opts: slack.WebApi.EmojiListParameters) => {
            return callApi<slack.WebApi.EmojiListResponse>('emoji.list', opts);
        }
    };

    export const files = {
        comments: {
            add: (opts: slack.WebApi.FilesCommentsAddParameters) => {
                return callApi<slack.WebApi.FilesCommentsAddResponse>('files.comments.add', opts);
            },
            delete: (opts: slack.WebApi.FilesCommentsDeleteParameters) => {
                return callApi<slack.WebApi.FilesCommentsDeleteResponse>('files.comments.delete', opts);
            },
            edit: (opts: slack.WebApi.FilesCommentsEditParameters) => {
                return callApi<slack.WebApi.FilesCommentsEditResponse>('files.comments.edit', opts);
            }
        },
        delete: (opts: slack.WebApi.FilesDeleteParameters) => {
            return callApi<slack.WebApi.FilesDeleteResponse>('files.delete', opts);
        },
        info: (opts: slack.WebApi.FilesInfoParameters) => {
            return callApi<slack.WebApi.FilesInfoResponse>('files.info', opts);
        },
        list: (opts: slack.WebApi.FilesListParameters) => {
            return callApi<slack.WebApi.FilesListResponse>('files.list', opts);
        },
        revokePublicURL: (opts: slack.WebApi.FilesRevokePublicUrlParameters) => {
            return callApi<slack.WebApi.FilesRevokePublicUrlResponse>('files.revokePublicURL', opts);
        },
        sharedPublicURL: (opts: slack.WebApi.FilesSharedPublicUrlParameters) => {
            return callApi<slack.WebApi.FilesSharedPublicUrlResponse>('files.sharedPublicURL', opts);
        },
        upload: (opts: slack.WebApi.FilesUploadParameters) => {
            return callApi<slack.WebApi.FilesUploadResponse>('files.upload', opts);
        }
    };

    export const groups = {
        archive: (opts: slack.WebApi.GroupsArchiveParameters) => {
            return callApi<slack.WebApi.GroupsArchiveResponse>('groups.archive', opts);
        },
        close: (opts: slack.WebApi.GroupsCloseParameters) => {
            return callApi<slack.WebApi.GroupsCloseResponse>('groups.close', opts);
        },
        create: (opts: slack.WebApi.GroupsCreateParameters) => {
            return callApi<slack.WebApi.GroupsCreateResponse>('groups.create', opts);
        },
        createChild: (opts: slack.WebApi.GroupsCreateChildParameters) => {
            return callApi<slack.WebApi.GroupsCreateChildResponse>('groups.createChild', opts);
        },
        history: (opts: slack.WebApi.GroupsHistoryParameters) => {
            return callApi<slack.WebApi.GroupsHistoryResponse>('groups.history', opts);
        },
        info: (opts: slack.WebApi.GroupsInfoParameters) => {
            return callApi<slack.WebApi.GroupsInfoResponse>('groups.info', opts);
        },
        invite: (opts: slack.WebApi.GroupsInviteParameters) => {
            return callApi<slack.WebApi.GroupsInviteResponse>('groups.invite', opts);
        },
        kick: (opts: slack.WebApi.GroupsKickParameters) => {
            return callApi<slack.WebApi.GroupsKickResponse>('groups.kick', opts);
        },
        leave: (opts: slack.WebApi.GroupsLeaveParameters) => {
            return callApi<slack.WebApi.GroupsLeaveResponse>('groups.leave', opts);
        },
        list: (opts: slack.WebApi.GroupsListParameters) => {
            return callApi<slack.WebApi.GroupsListResponse>('groups.list', opts);
        },
        mark: (opts: slack.WebApi.GroupsMarkParameters) => {
            return callApi<slack.WebApi.GroupsMarkResponse>('groups.mark', opts);
        },
        open: (opts: slack.WebApi.GroupsOpenParameters) => {
            return callApi<slack.WebApi.GroupsOpenResponse>('groups.open', opts);
        },
        rename: (opts: slack.WebApi.GroupsRenameParameters) => {
            return callApi<slack.WebApi.GroupsRenameResponse>('groups.rename', opts);
        },
        replies: (opts: slack.WebApi.GroupsRepliesParameters) => {
            return callApi<slack.WebApi.GroupsRepliesResponse>('groups.replies', opts);
        },
        setPurpose: (opts: slack.WebApi.GroupsSetPurposeParameters) => {
            return callApi<slack.WebApi.GroupsSetPurposeResponse>('groups.setPurpose', opts);
        },
        setTopic: (opts: slack.WebApi.GroupsSetTopicParameters) => {
            return callApi<slack.WebApi.GroupsSetTopicResponse>('groups.setTopic', opts);
        },
        unarchive: (opts: slack.WebApi.GroupsUnarchiveParameters) => {
            return callApi<slack.WebApi.GroupsUnarchiveResponse>('groups.unarchive', opts);
        }
    };

    export const im = {
        close: (opts: slack.WebApi.ImCloseParameters) => {
            return callApi<slack.WebApi.ImCloseResponse>('im.close', opts);
        },
        history: (opts: slack.WebApi.ImHistoryParameters) => {
            return callApi<slack.WebApi.ImHistoryResponse>('im.history', opts);
        },
        list: (opts: slack.WebApi.ImListParameters) => {
            return callApi<slack.WebApi.ImListResponse>('im.list', opts);
        },
        mark: (opts: slack.WebApi.ImMarkParameters) => {
            return callApi<slack.WebApi.ImMarkResponse>('im.mark', opts);
        },
        open: (opts: slack.WebApi.ImOpenParameters) => {
            return callApi<slack.WebApi.ImOpenResponse>('im.open', opts);
        },
        replies: (opts: slack.WebApi.ImRepliesParameters) => {
            return callApi<slack.WebApi.ImRepliesResponse>('im.replies', opts);
        }
    };

    export const mpim = {
        close: (opts: slack.WebApi.MpimCloseParameters) => {
            return callApi<slack.WebApi.MpimCloseResponse>('mpim.close', opts);
        },
        history: (opts: slack.WebApi.MpimHistoryParameters) => {
            return callApi<slack.WebApi.MpimHistoryResponse>('mpim.history', opts);
        },
        list: (opts: slack.WebApi.MpimListParameters) => {
            return callApi<slack.WebApi.MpimListResponse>('mpim.list', opts);
        },
        mark: (opts: slack.WebApi.MpimMarkParameters) => {
            return callApi<slack.WebApi.MpimMarkResponse>('mpim.mark', opts);
        },
        open: (opts: slack.WebApi.MpimOpenParameters) => {
            return callApi<slack.WebApi.MpimOpenResponse>('mpim.open', opts);
        },
        replies: (opts: slack.WebApi.MpimRepliesParameters) => {
            return callApi<slack.WebApi.MpimRepliesResponse>('mpim.replies', opts);
        }
    };

    export const oauth = {
        access: (opts: slack.WebApi.OauthAccessParameters) => {
            return callApi<slack.WebApi.OauthAccessResponse>('oauth.access', opts);
        }
    };

    export const pins = {
        add: (opts: slack.WebApi.PinsAddParameters) => {
            return callApi<slack.WebApi.PinsAddResponse>('pins.add', opts);
        },
        list: (opts: slack.WebApi.PinsListParameters) => {
            return callApi<slack.WebApi.PinsListResponse>('pins.list', opts);
        },
        remove: (opts: slack.WebApi.PinsRemoveParameters) => {
            return callApi<slack.WebApi.PinsRemoveResponse>('pins.remove', opts);
        }
    };

    export const reactions = {
        add: (opts: slack.WebApi.ReactionsAddParameters) => {
            return callApi<slack.WebApi.ReactionsAddResponse>('reactions.add', opts);
        },
        get: (opts: slack.WebApi.ReactionsGetParameters) => {
            return callApi<slack.WebApi.ReactionsGetResponse>('reactions.add', opts);
        },
        list: (opts: slack.WebApi.ReactionsListParameters) => {
            return callApi<slack.WebApi.ReactionsListResponse>('reactions.list', opts);
        },
        remove: (opts: slack.WebApi.ReactionsRemoveParameters) => {
            return callApi<slack.WebApi.ReactionsRemoveResponse>('reactions.remove', opts);
        }
    };

    export const reminders = {
        add: (opts: slack.WebApi.RemindersAddParameters) => {
            return callApi<slack.WebApi.RemindersAddResponse>('reminders.add', opts);
        },
        complete: (opts: slack.WebApi.RemindersCompleteParameters) => {
            return callApi<slack.WebApi.RemindersCompleteResponse>('reminders.complete', opts);
        },
        delete: (opts: slack.WebApi.RemindersDeleteParameters) => {
            return callApi<slack.WebApi.RemindersDeleteResponse>('reminders.delete', opts);
        },
        info: (opts: slack.WebApi.RemindersInfoParameters) => {
            return callApi<slack.WebApi.RemindersInfoResponse>('reminders.info', opts);
        },
        list: (opts: slack.WebApi.RemindersListParameters) => {
            return callApi<slack.WebApi.RemindersListResponse>('reminders.list', opts);
        },

    };

    export const rtm = {
        connect: (opts: slack.WebApi.RtmConnectParameters) => {
            return callApi<slack.WebApi.RtmConnectResponse>('rtm.connect', opts);
        },
        start: (opts: slack.WebApi.RtmStartParameters) => {
            return callApi<slack.WebApi.RtmStartResponse>('rtm.start', opts);
        }
    };

    export const search = {
        all: (opts: slack.WebApi.SearchAllParameters) => {
            return callApi<slack.WebApi.SearchAllResponse>('search.all', opts);
        },
        files: (opts: slack.WebApi.SearchFilesParameters) => {
            return callApi<slack.WebApi.SearchFilesResponse>('search.files', opts);
        },
        messages: (opts: slack.WebApi.SearchMessagesParameters) => {
            return callApi<slack.WebApi.SearchMessagesResponse>('search.messages', opts);
        }
    };

    export const stars = {
        add: (opts: slack.WebApi.StarsAddParameters) => {
            return callApi<slack.WebApi.StarsAddResponse>('stars.add', opts);
        },
        list: (opts: slack.WebApi.StarsListParameters) => {
            return callApi<slack.WebApi.StarsListResponse>('stars.list', opts);
        },
        remove: (opts: slack.WebApi.StarsRemoveParameters) => {
            return callApi<slack.WebApi.StarsRemoveResponse>('stars.remove', opts);
        }
    };

    export const team = {
        accessLogs: (opts: slack.WebApi.TeamAccessLogsParameters) => {
            return callApi<slack.WebApi.TeamAccessLogsResponse>('team.accessLogs', opts);
        },
        billableInfo: (opts: slack.WebApi.TeamBillableInfoParameters) => {
            return callApi<slack.WebApi.TeamBillableInfoResponse>('team.billableInfo', opts);
        },
        info: (opts: slack.WebApi.TeamInfoParameters) => {
            return callApi<slack.WebApi.TeamInfoResponse>('team.info', opts);
        },
        integrationLogs: (opts: slack.WebApi.StarsAddParameters) => {
            return callApi<slack.WebApi.StarsAddResponse>('team.integrationLogs', opts);
        },
        profile: {
            get: (opts: slack.WebApi.TeamProfileGetParameters) => {
                return callApi<slack.WebApi.TeamProfileGetResponse>('team.profile.get', opts);
            }
        }
    }

    export const usergroups = {
        create: (opts: slack.WebApi.UsergroupsCreateParameters) => {
            return callApi<slack.WebApi.UsergroupsCreateResponse>('usergroups.create', opts);
        },
        disable: (opts: slack.WebApi.UsergroupsDisableParameters) => {
            return callApi<slack.WebApi.UsergroupsDisableResponse>('usergroups.disable', opts);
        },
        enable: (opts: slack.WebApi.UsergroupsEnableParameters) => {
            return callApi<slack.WebApi.UsergroupsEnableResponse>('usergroups.enable', opts);
        },
        list: (opts: slack.WebApi.UsergroupsListParameters) => {
            return callApi<slack.WebApi.UsergroupsListResponse>('usergroups.list', opts);
        },
        update: (opts: slack.WebApi.UsergroupsUpdateParameters) => {
            return callApi<slack.WebApi.UsergroupsUpdateResponse>('usergroups.update', opts);
        },
        users: {
            list: (opts: slack.WebApi.UsergroupsUsersListParameters) => {
                return callApi<slack.WebApi.UsergroupsUsersListResponse>('usergroups.users.list', opts);
            },
            update: (opts: slack.WebApi.UsergroupsUsersUpdateParameters) => {
                return callApi<slack.WebApi.UsergroupsUsersUpdateResponse>('usergroups.users.update', opts);
            }
        }
    };

    export const users = {
        deletePhoto: (opts: slack.WebApi.UsersDeletePhotoParameters) => {
            return callApi<slack.WebApi.UsersDeletePhotoResponse>('users.deletePhoto', opts);
        },
        getPresence: (opts: slack.WebApi.UsersGetPresenceParameters) => {
            return callApi<slack.WebApi.UsersGetPresenceResponse>('users.getPresence', opts);
        },
        identity: (opts: slack.WebApi.UsersIdentityParameters) => {
            return callApi<slack.WebApi.UsersIdentityResponse>('users.identity', opts);
        },
        info: (opts: slack.WebApi.UsersInfoParameters) => {
            return callApi<slack.WebApi.UsersInfoResponse>('users.info', opts);
        },
        list: (opts: slack.WebApi.UsersListParameters) => {
            return callApi<slack.WebApi.UsersListResponse>('users.list', opts);
        },
        setActive: (opts: slack.WebApi.UsersSetActiveParameters) => {
            return callApi<slack.WebApi.UsersSetActiveResponse>('users.setActive', opts);
        },
        setPhoto: (opts: slack.WebApi.UsersSetPhotoParameters) => {
            return callApi<slack.WebApi.UsersSetPhotoResponse>('users.setPhoto', opts);
        },
        setPresence: (opts: slack.WebApi.UsersSetPresenceParameters) => {
            return callApi<slack.WebApi.UsersSetPresenceResponse>('users.setPresence', opts);
        },
        profile: {
            get: (opts: slack.WebApi.UsersProfileGetParameters) => {
                return callApi<slack.WebApi.UsersProfileGetResponse>('users.profile.get', opts);
            },
            set: (opts: slack.WebApi.UsersProfileSetParameters) => {
                return callApi<slack.WebApi.UsersProfileSetResponse>('users.profile.set', opts);
            }
        }
    };
}

export namespace EventsApi {
    export function handleEvent(event: slack.EventsApi.Event) {
        
    }
}