import { ReadStream } from 'fs';

declare module slack {
    export interface Bot {
        id: string;
        app_id: string;
        deleted: boolean;
        name: string;
        icons: {
            image_36: string;
            image_48: string;
            image_72: string;
        };
    }
    export interface Channel {
        id: string;
        name: string;
        is_channel: string;
        created: number;
        creator: string;
        is_archived: boolean;
        is_general: boolean;
        members: string[];
        topic: {
            value: string;
            creator: string;
            last_set: number;
        };
        purpose: {
            value: string;
            creator: string;
            last_set: number;
        };
        is_member: boolean;
        last_read: string;
        latest: Message;
        unread_count: number;
        unread_count_display: number;
    }
    type FileType = 'auto' | 'text' | 'applescript' | 'boxnote' | 'c' | 'csharp' | 'cpp' |
        'css' | 'csv' | 'clojure' | 'coffeescript' | 'cfm' | 'd' | 'dart' | 'diff' |
        'dockerfile' | 'erlang' | 'fsharp' | 'fortran' | 'go' | 'groovy' | 'html' |
        'handlebars' | 'haskell' | 'haxe' | 'java' | 'javascript' | 'kotlin' |
        'latex' | 'lisp' | 'lua' | 'markdown' | 'matlab' | 'mumps' | 'ocaml' |
        'objc' | 'php' | 'pascal' | 'perl' | 'pig' | 'post' | 'powershell' |
        'puppet' | 'python' | 'r' | 'ruby' | 'rust' | 'sql' | 'sass' | 'scala' |
        'scheme' | 'shell' | 'smalltalk' | 'swift' | 'tsv' | 'vb' | 'vbscript' |
        'velocity' | 'verilog' | 'xml' | 'yaml';
    type FileCategory = 'all' | 'spaces' | 'snippets' | 'images' | 'gdocs' | 'zips' | 'pdfs';
    export interface File {
        id: string;
        created: number;
        timestamp: number;
        name: string;
        title: string;
        mimetype: string;
        filetype: FileType;
        pretty_type: string;
        user: string;
        mode: string;
        editable: boolean;
        is_external: boolean;
        external_type: string;
        username: string;
        size: number;
        url_private: string;
        url_private_download: string;
        thumb_64: string;
        thumb_80: string;
        thumb_360: string;
        thumb_360_gif: string;
        thumb_360_w: number;
        thumb_360_h: number;
        thumb_480: string;
        thumb_480_w: number;
        thumb_480_h: number;
        thumb_160: string;
        permalink: string;
        permalink_public: string;
        edit_link: string;
        preview: string;
        preview_highlight: string;
        lines: number;
        lines_more: number;
        is_public: boolean;
        public_url_shared: boolean;
        display_as_bot: boolean;
        channels: string[];
        groups: string[];
        ims: string[];
        initial_comment: FileComment,
        num_stars: number;
        is_starred: boolean;
        pinned_to: string[];
        reactions: Reaction[],
        comments_count: number;
    }
    export interface FileComment {
        id: string;
        timestamp: number;
        user: string;
        comment: string;
        channel?: string;
        reactions?: Reaction[];
    }
    export interface Reaction {
        name: string;
        count: number;
        users: string[];
    }
    export interface Group {
        id: string;
        name: string;
        is_group: string;
        created: number;
        creator: string;
        is_archived: boolean;
        is_mpim: boolean;
        members: string[];
        topic: {
            value: string;
            creator: string;
            last_set: number;
        };
        purpose: {
            value: string;
            creator: string;
            last_set: number;
        };
        last_read: string;
        latest: Message;
        unread_count: number;
        unread_count_display: number;
    }
    export interface Im {
        id: string;
        is_im: boolean;
        user: string;
        created: number;
        is_user_deleted: boolean;
    }
    export interface Mpim {
        id: string;
        name: string;
        is_mpim: boolean;
        is_group: boolean;
        created: number;
        creator: string;
        members: string[];
        last_read: string;
        latest: Message;
        unread_count: number;
        unread_count_display: number;
    }
    export interface User {
        id: string;
        name: string;
        deleted: boolean;
        color: string;
        profile: {
            avatar_hash: string;
            current_status: string;
            first_name: string;
            last_name: string;
            real_name: string;
            email: string;
            skype: string;
            phone: string;
            image_24: string;
            image_32: string;
            image_48: string;
            image_72: string;
            image_192: string;
            image_512: string;
        };
        is_admin: boolean;
        is_owner: boolean;
        is_primary_owner: boolean;
        is_restricted: boolean;
        is_ultra_restricted: boolean;
        updated: number;
        has_2fa: boolean;
        two_factor_type?: 'app' | 'sms';
    }
    export interface Usergroup {
        id: string;
        team_id: string;
        is_usergroup: boolean;
        name: string;
        description: string;
        handle: string;
        is_external: boolean;
        date_create: number;
        date_update: number;
        date_delete: number;
        auto_type: string;
        created_by: string;
        updated_by: string;
        deleted_by: string | null;
        prefs: {
            channels: Channel[];
            groups: Group[];
        },
        users: string[];
        user_count: string;
    }
    type MessageParseOptions = 'none' | 'full';
    export interface Message {
        reactions?: Reaction[];
    }
    export interface Attachment {
        fallback: string;
        color?: string;
        pretext?: string;
        author_name?: string;
        author_link?: string;
        author_icon?: string;
        title?: string;
        title_link?: string;
        text?: string;
        fields?: {
            title?: string;
            value?: string;
            short?: boolean;
        }[];
        image_url?: string;
        thumb_url?: string;
        footer?: string;
        footer_icon?: string;
        ts?: number;
    }
    interface PinnedItemBase {
        created: number;
        created_by: string;
    }
    interface MessagePayload {
        type: 'message';
        channel: string;
        message: Message;
    }
    interface MessagePayloadLight {
        type: 'message';
        channel: string;
        ts: string;
    }
    interface FilePayload {
        type: 'file';
        file: File;
    }
    interface FilePayloadLight {
        type: 'file';
        file: string;
    }
    interface FileCommentPayload {
        type: 'file_comment';
        file: File;
        comment: FileComment;
    }
    interface FileCommentPayloadLight {
        type: 'file_comment';
        file: string;
        comment: string;
    }
    interface ChannelPayload {
        type: 'channel';
        channel: string;
    }
    interface ImPayload {
        type: 'im';
        channel: string;
    }
    interface GroupPayload {
        type: 'group';
        channel: string;
    }
    interface LinkPayload {
        domain: string;
        url: string;
    }
    interface Paging {
        count: number;
        total: number;
        page: number;
        pages: number;
    }
    export interface Reminder {
        id: string;
        creator: string;
        user: string;
        text: string;
        recurring: boolean;
        time?: number;
        complete_ts?: number;
    }
    type Presence = 'active' | 'away';
    export interface Profile {
        status_text: string;
        status_emoji: string;
        first_name: string;
        last_name: string;
        email: string;
        skype: string;
        image_24: string;
        image_32: string;
        image_48: string;
        image_72: string;
        image_192: string;
        image_512: string;
        image_1024: string;
        image_original: string;
        fields: {
            [id: string]: {
                value: string;
                alt: string;
                label: string;
            };
        };
        always_active?: boolean;
    }

    export namespace WebApi {
        export interface ParametersAuthRequired {
            token: string;
        }
        export interface Response {
            ok: boolean;
            error?: string;
        }

        // api
        export interface ApiTestParameters {
            [index: string]: string;
            error?: string;
        }
        export interface ApiTestResponse extends Response {
            args: {
                [index in keyof ApiTestParameters]: string;
            }
        }

        // auth
        export interface AuthRevokeParameters {
            token?: string;
            test?: boolean;
        }
        export interface AuthRevokeResponse extends Response {
            revoked: boolean;
        }
        export interface AuthTestParameters extends ParametersAuthRequired { }
        export interface AuthTestResponse extends Response {
            url: string;
            team: string;
            user: string;
            team_id: string;
            user_id: string;
            enterprise_id?: string;
        }

        // bots
        export interface BotsInfoParameters extends ParametersAuthRequired {
            bot: string;
        }
        export interface BotsInfoResponse extends Response {
            bot: Bot;
        }

        // channels
        export interface ChannelsArchiveParameters extends ParametersAuthRequired {
            channel: string;
        }
        export interface ChannelsArchiveResponse extends Response { }
        export interface ChannelsCreateParameters extends ParametersAuthRequired {
            name: string;
            validate?: boolean;
        }
        export interface ChannelsCreateResponse extends Response {
            channel: Channel;
        }
        export interface ChannelsHistoryParameters extends ParametersAuthRequired {
            channel: string;
            latest?: string;
            oldest?: string;
            inclusive?: boolean;
            count?: number;
            unreads?: boolean;
        }
        export interface ChannelsHistoryResponse extends Response {
            latest: string;
            messages: Message[];
            has_more: boolean;
        }
        export interface ChannelsInfoParameters extends ParametersAuthRequired {
            channel: string;
        }
        export interface ChannelsInfoResponse extends Response {
            channel: Channel;
        }
        export interface ChannelsInviteParameters extends ParametersAuthRequired {
            channel: string;
            user: string;
        }
        export interface ChannelsInviteResponse extends Response {
            channel: Channel;
        }
        export interface ChannelsJoinParameters extends ParametersAuthRequired {
            name: string;
            validate?: boolean;
        }
        export interface ChannelsJoinResponse extends Response {
            channel: Channel;
        }
        export interface ChannelsKickParameters extends ParametersAuthRequired {
            channel: string;
            user: string;
        }
        export interface ChannelsKickResponse extends Response { }
        export interface ChannelsLeaveParameters extends ParametersAuthRequired {
            channel: string;
        }
        export interface ChannelsLeaveResponse extends Response {
            not_in_channel?: boolean;
        }
        export interface ChannelsListParameters extends ParametersAuthRequired {
            exclude_archived?: boolean;
            exclude_members?: boolean;
        }
        export interface ChannelsListResponse extends Response {
            channels: Channel[];
        }
        export interface ChannelsMarkParameters extends ParametersAuthRequired {
            channel: string;
            ts: string;
        }
        export interface ChannelsMarkResponse extends Response { }
        export interface ChannelsRenameParameters extends ParametersAuthRequired {
            channel: string;
            name: string;
            validate?: boolean;
        }
        export interface ChannelsRenameResponse extends Response {
            channel: {
                id: string;
                is_channel: boolean;
                name: string;
                created: number;
            }
        }
        export interface ChannelsRepliesParameters extends ParametersAuthRequired {
            channel: string;
            thread_ts: string;
        }
        export interface ChannelsRepliesResponse extends Response {
            messages: Message[];
        }
        export interface ChannelsSetPurposeParameters extends ParametersAuthRequired {
            channel: string;
            purpose: string;
        }
        export interface ChannelsSetPurposeResponse extends Response {
            purpose: string;
        }
        export interface ChannelsSetTopicParameters extends ParametersAuthRequired {
            channel: string;
            topic: string;
        }
        export interface ChannelsSetTopicResponse extends Response {
            topic: string;
        }
        export interface ChannelsUnarchiveParameters extends ParametersAuthRequired {
            channel: string;
        }
        export interface ChannelsUnarchiveResponse extends Response { }

        // chat
        export interface ChatDeleteParameters extends ParametersAuthRequired {
            ts: string;
            channel: string;
            as_user?: boolean;
        }
        export interface ChatDeleteResponse extends Response {
            channel: string;
            ts: string;
        }
        export interface ChatMeMessageParameters extends ParametersAuthRequired {
            channel: string;
            text: string;
        }
        export interface ChatMeMessageResponse extends Response {
            channel: string;
            ts: string;
        }
        export interface ChatPostMessageParameters extends ParametersAuthRequired {
            channel: string;
            text: string;
            parse?: MessageParseOptions;
            link_names?: boolean;
            attachments?: Attachment[];
            unfurl_links?: boolean;
            unfurl_media?: boolean;
            username?: string;
            as_user?: boolean;
            icon_url?: string;
            icon_emoji?: string;
            thread_ts?: string;
            reply_broadcast?: boolean;
        }
        export interface ChatPostMessageResponse extends Response {
            ts: string;
            channel: string;
            message: Message;
        }
        export interface ChatUnfurlParameters extends ParametersAuthRequired {
            channel: string;
            ts: string;
            unfurls: string;
            user_auth_required?: boolean;
        }
        export interface ChatUnfurlResponse extends Response { }
        export interface ChatUpdateParameters extends ParametersAuthRequired {
            ts: string;
            channel: string;
            text: string;
            attachments?: Attachment[];
            parse?: MessageParseOptions;
            link_names?: boolean;
            as_user?: boolean;
        }
        export interface ChatUpdateResponse extends Response {
            channel: string;
            ts: string;
            text: string;
        }

        // dnd
        export interface DndEndDndParameters extends ParametersAuthRequired { }
        export interface DndEndDndResponse extends Response { }
        export interface DndEndSnoozeParameters extends ParametersAuthRequired { }
        export interface DndEndSnoozeResponse extends Response {
            dnd_enabled: boolean;
            next_dnd_start_ts: number;
            next_dnd_end_ts: number;
            snooze_enabled: boolean;
        }
        export interface DndInfoParameters extends ParametersAuthRequired {
            user?: string;
        }
        export interface DndInfoResponse extends Response {
            dnd_enabled: boolean;
            next_dnd_start_ts: number;
            next_dnd_end_ts: number;
            snooze_enabled: boolean;
            snooze_endtime: number;
            snooze_remaining: number;
        }
        export interface DndSetSnoozeParameters extends ParametersAuthRequired {
            num_minutes: number;
        }
        export interface DndSetSnoozeResponse extends Response {
            snooze_enabled: boolean;
            snooze_endtime: number;
            snooze_remaining: number;
        }
        export interface DndTeamInfoParameters extends ParametersAuthRequired {
            users: string;
        }
        export interface DndTeamInfoResponse extends Response {
            users: {
                [user: string]: {
                    dnd_enabled: boolean;
                    next_dnd_start_ts: number;
                    next_dnd_end_ts: number;
                }
            }
        }

        // emoji
        export interface EmojiListParameters extends ParametersAuthRequired { }
        export interface EmojiListResponse extends Response {
            emoji: {
                [name: string]: string;
            }
        }

        // files
        export interface FilesCommentsAddParameters extends ParametersAuthRequired {
            file: string;
            comment: string;
        }
        export interface FilesCommentsAddResponse extends Response {
            comment: FileComment;
        }
        export interface FilesCommentsDeleteParameters extends ParametersAuthRequired {
            file: string;
            id: string;
        }
        export interface FilesCommentsDeleteResponse extends Response { }
        export interface FilesCommentsEditParameters extends ParametersAuthRequired {
            file: string;
            id: string;
            comment: string;
        }
        export interface FilesCommentsEditResponse extends Response {
            comment: FileComment;
        }
        export interface FilesDeleteParameters extends ParametersAuthRequired {
            file: string;
        }
        export interface FilesDeleteResponse extends Response { }
        export interface FilesInfoParameters extends ParametersAuthRequired {
            file: string;
            count?: number;
            page?: number;
        }
        export interface FilesInfoResponse extends Response {
            file: File;
            comments: Comment[];
            paging: Paging;
        }
        export interface FilesListParameters extends ParametersAuthRequired {
            user?: string;
            channel?: string;
            ts_from?: number;
            ts_to?: number;
            types?: FileCategory;
            count?: number;
            page?: number;
        }
        export interface FilesListResponse extends Response {
            files: File[];
            paging: Paging;
        }
        export interface FilesRevokePublicUrlParameters extends ParametersAuthRequired {
            file: string;
        }
        export interface FilesRevokePublicUrlResponse extends Response {
            file: File;
        }
        export interface FilesSharedPublicUrlParameters extends ParametersAuthRequired {
            file: string;
        }
        export interface FilesSharedPublicUrlResponse extends Response {
            file: File;
            comments: Comment[];
            paging: Paging;
        }
        export interface FilesUploadParameters extends ParametersAuthRequired {
            file?: ReadStream;
            content?: string;
            filetype?: FileType;
            filename: string;
            title?: string;
            initial_comment?: string;
            channels?: string;
        }
        export interface FilesUploadResponse extends Response {
            file: File;
        }

        // groups
        export interface GroupsArchiveParameters extends ParametersAuthRequired {
            channel: string;
        }
        export interface GroupsArchiveResponse extends Response { }
        export interface GroupsCloseParameters extends ParametersAuthRequired {
            channel: string;
        }
        export interface GroupsCloseResponse extends Response { }
        export interface GroupsCreateParameters extends ParametersAuthRequired {
            name: string;
            validate?: boolean;
        }
        export interface GroupsCreateResponse extends Response {
            group: Group;
        }
        export interface GroupsCreateChildParameters extends ParametersAuthRequired {
            channel: string;
        }
        export interface GroupsCreateChildResponse extends Response {
            group: Group;
        }
        export interface GroupsHistoryParameters extends ParametersAuthRequired {
            channel: string;
            latest?: string;
            oldest?: string;
            inclusive?: boolean;
            count?: number;
            unreads?: boolean;
        }
        export interface GroupsHistoryResponse extends Response {
            latest: string;
            messages: Message[];
            has_more: boolean;
        }
        export interface GroupsInfoParameters extends ParametersAuthRequired {
            channel: string;
        }
        export interface GroupsInfoResponse extends Response {
            group: Group;
        }
        export interface GroupsInviteParameters extends ParametersAuthRequired {
            channel: string;
            user: string;
        }
        export interface GroupsInviteResponse extends Response {
            already_in_group?: boolean;
            group: Group;
        }
        export interface GroupsKickParameters extends ParametersAuthRequired {
            channel: string;
            user: string;
        }
        export interface GroupsKickResponse extends Response { }
        export interface GroupsLeaveParameters extends ParametersAuthRequired {
            channel: string;
        }
        export interface GroupsLeaveResponse extends Response { }
        export interface GroupsListParameters extends ParametersAuthRequired {
            exclude_archived?: boolean;
        }
        export interface GroupsListResponse extends Response {
            groups: Group[];
        }
        export interface GroupsMarkParameters extends ParametersAuthRequired {
            channel: string;
            ts: string;
        }
        export interface GroupsMarkResponse extends Response { }
        export interface GroupsOpenParameters extends ParametersAuthRequired {
            channel: string;
        }
        export interface GroupsOpenResponse extends Response { }
        export interface GroupsRenameParameters extends ParametersAuthRequired {
            channel: string;
            name: string;
            validate?: boolean;
        }
        export interface GroupsRenameResponse extends Response {
            channel: {
                id: string;
                is_group: boolean;
                name: string;
                created: number;
            };
        }
        export interface GroupsRepliesParameters extends ParametersAuthRequired {
            channel: string;
            thread_ts: string;
        }
        export interface GroupsRepliesResponse extends Response {
            messages: Message[];
            thread_info: {
                complete: boolean;
                count: number;
            };
        }
        export interface GroupsSetPurposeParameters extends ParametersAuthRequired {
            channel: string;
            purpose: string;
        }
        export interface GroupsSetPurposeResponse extends Response {
            purpose: string;
        }
        export interface GroupsSetTopicParameters extends ParametersAuthRequired {
            channel: string;
            topic: string;
        }
        export interface GroupsSetTopicResponse extends Response {
            topic: string;
        }
        export interface GroupsUnarchiveParameters extends ParametersAuthRequired {
            channel: string;
        }
        export interface GroupsUnarchiveResponse extends Response { }

        // im 
        export interface ImCloseParameters extends ParametersAuthRequired {
            channel: string;
        }
        export interface ImCloseResponse extends Response { }
        export interface ImHistoryParameters extends ParametersAuthRequired {
            channel: string;
            latest?: string;
            oldest?: string;
            inclusive?: boolean;
            count?: number;
            unreads?: boolean;
        }
        export interface ImHistoryResponse extends Response {
            latest: string;
            messages: Message[];
            has_more: boolean;
        }
        export interface ImListParameters extends ParametersAuthRequired { }
        export interface ImListResponse extends Response {
            ims: Im[];
        }
        export interface ImMarkParameters extends ParametersAuthRequired {
            channel: string;
            ts: string;
        }
        export interface ImMarkResponse extends Response { }
        export interface ImOpenParameters extends ParametersAuthRequired {
            user: string;
            return_im?: boolean;
        }
        export interface ImOpenResponse extends Response {
            channel: {
                id: string;
            } | Channel;
            no_op?: boolean;
            already_open?: boolean;
        }
        export interface ImRepliesParameters extends ParametersAuthRequired {
            channel: string;
            thread_ts: string;
        }
        export interface ImRepliesResponse extends Response {
            messages: Message[];
            thread_info: {
                complete: boolean;
                count: number;
            };
        }

        // mpim 
        export interface MpimCloseParameters extends ParametersAuthRequired {
            channel: string;
        }
        export interface MpimCloseResponse extends Response { }
        export interface MpimHistoryParameters extends ParametersAuthRequired {
            channel: string;
            latest?: string;
            oldest?: string;
            inclusive?: boolean;
            count?: number;
            unreads?: boolean;
        }
        export interface MpimHistoryResponse extends Response {
            latest: string;
            messages: Message[];
            has_more: boolean;
        }
        export interface MpimListParameters extends ParametersAuthRequired { }
        export interface MpimListResponse extends Response {
            groups: Group[];
        }
        export interface MpimMarkParameters extends ParametersAuthRequired {
            channel: string;
            ts: string;
        }
        export interface MpimMarkResponse extends Response { }
        export interface MpimOpenParameters extends ParametersAuthRequired {
            users: string;
        }
        export interface MpimOpenResponse extends Response {
            group: Mpim;
        }
        export interface MpimRepliesParameters extends ParametersAuthRequired {
            channel: string;
            thread_ts: string;
        }
        export interface MpimRepliesResponse extends Response {
            messages: Message[];
            thread_info: {
                complete: string;
                count: number;
            };
        }

        // oauth
        export interface OauthAccessParameters {
            client_id: string;
            client_secret: string;
            code: string;
            redirect_uri?: string;
        }
        export interface OauthAccessResponse extends Response {
            access_token: string;
            scope: string;
        }

        // pins
        export interface PinsAddParameters extends ParametersAuthRequired {
            channel: string;
            file?: string;
            file_comment?: string;
            timestamp?: string;
        }
        export interface PinsAddResponse extends Response { }
        export interface PinsListParameters extends ParametersAuthRequired {
            channel: string;
        }
        export interface PinsListResponse extends Response {
            items: (PinnedItemBase & (MessagePayload | FilePayload | FileCommentPayload))[];
        }
        export interface PinsRemoveParameters extends ParametersAuthRequired {
            channel: string;
            file?: string;
            file_comment?: string;
            timestamp?: string;
        }
        export interface PinsRemoveResponse extends Response { }

        // reactions
        export interface ReactionsAddParameters extends ParametersAuthRequired {
            name: string;
            file?: string;
            file_comment?: string;
            channel?: string;
            timestamp?: string;
        }
        export interface ReactionsAddResponse extends Response { }
        export interface ReactionsGetParameters extends ParametersAuthRequired {
            name: string;
            file?: string;
            file_comment?: string;
            channel?: string;
            timestamp?: string;
            full?: boolean;
        }
        export type ReactionsGetResponse = Response & (MessagePayload | FilePayload | FileCommentPayload);
        export interface ReactionsListParameters extends ParametersAuthRequired { }
        export interface ReactionsListResponse extends Response {
            items: (MessagePayload | FilePayload | FileCommentPayload)[];
            paging: Paging;
        }
        export interface ReactionsRemoveParameters extends ParametersAuthRequired {
            name: string;
            file?: string;
            file_comment?: string;
            channel?: string;
            timestamp?: string;
        }
        export interface ReactionsRemoveResponse extends Response { }

        // reminders
        export interface RemindersAddParameters extends ParametersAuthRequired {
            text: string;
            time: number;
            user?: string;
        }
        export interface RemindersAddResponse extends Response {
            reminder: Reminder;
        }
        export interface RemindersCompleteParameters extends ParametersAuthRequired {
            reminder: string;
        }
        export interface RemindersCompleteResponse extends Response { }
        export interface RemindersDeleteParameters extends ParametersAuthRequired {
            reminder: string;
        }
        export interface RemindersDeleteResponse extends Response { }
        export interface RemindersInfoParameters extends ParametersAuthRequired {
            reminder: string;
        }
        export interface RemindersInfoResponse extends Response {
            reminder: Reminder;
        }
        export interface RemindersListParameters extends ParametersAuthRequired { }
        export interface RemindersListResponse extends Response {
            reminders: Reminder[];
        }

        // rtm
        export interface RtmConnectParameters extends ParametersAuthRequired { }
        export interface RtmConnectResponse extends Response {
            url: string;
            team: {
                id: string;
                name: string;
                domain: string;
                enterprise_id?: string;
                enterprise_name?: string;
            };
            self: {
                id: string;
                name: string;
            };
        }
        export interface RtmStartParameters extends ParametersAuthRequired {
            simple_latest?: boolean;
            no_unreads?: boolean;
            mpim_aware?: boolean;
            no_latest?: boolean;
        }
        export interface RtmStartResponse extends Response {
            url: string;
            self: {
                id: string;
                name: string;
                prefs: object;
                created: number;
                manual_presence: Presence;
            };
            team: {
                id: string;
                name: string;
                email_domain: string;
                domain: string;
                icon: object;
                msg_edit_window_mins: number;
                over_storage_limit: boolean;
                prefs: object;
                plan: string;
            };
            users: User[];
            channels: Channel[];
            groups: Group[];
            mpims: Mpim[];
            ims: Im[];
            bots: Bot[];
        }

        // search
        export interface SearchAllParameters extends ParametersAuthRequired {
            query: string;
            sort?: 'score' | 'timestamp';
            sort_dir?: 'asc' | 'desc';
            highlight?: boolean;
            count?: number;
            page?: number;
        }
        export interface SearchAllResponse extends Response {
            query: string;
            messages: {
                matches: Message[];
                paging: Paging;
            };
            files: {
                matches: File[];
                paging: Paging;
            };
        }
        export interface SearchFilesParameters extends ParametersAuthRequired {
            query: string;
            sort?: 'score' | 'timestamp';
            sort_dir?: 'asc' | 'desc';
            highlight?: boolean;
            count?: number;
            page?: number;
        }
        export interface SearchFilesResponse extends Response {
            query: string;
            files: {
                total: number;
                paging: Paging;
                matches: File[];
            };
        }
        export interface SearchMessagesParameters extends ParametersAuthRequired {
            query: string;
            sort?: 'score' | 'timestamp';
            sort_dir?: 'asc' | 'desc';
            highlight?: boolean;
            count?: number;
            page?: number;
        }
        export interface SearchMessagesResponse extends Response {
            query: string;
            files: {
                total: number;
                paging: Paging;
                matches: Message[];
            };
        }

        // stars
        export interface StarsAddParameters extends ParametersAuthRequired {
            file?: string;
            file_comment?: string;
            channel?: string;
            timestamp?: string;
        }
        export interface StarsAddResponse extends Response { }
        export interface StarsListParameters extends ParametersAuthRequired {
            count?: number;
            page?: number;
        }
        export interface StarsListResponse extends Response {
            items: (MessagePayload | FilePayload | FileCommentPayload | ChannelPayload | ImPayload | GroupPayload)[];
            paging: Paging;
        }
        export interface StarsRemoveParameters extends ParametersAuthRequired {
            file?: string;
            file_comment?: string;
            channel?: string;
            timestamp?: string;
        }
        export interface StarsRemoveResponse extends Response { }

        // team
        export interface TeamAccessLogsParameters extends ParametersAuthRequired {
            count?: number;
            page?: number;
            before?: number;
        }
        export interface TeamAccessLogsResponse extends Response {
            logins: {
                user_id: string;
                username: string;
                date_first: number;
                date_last: number;
                count: number;
                ip: string;
                user_agent: string;
                isp: string;
                country: string;
                region: string;
            }[];
            paging: Paging;
        }
        export interface TeamBillableInfoParameters extends ParametersAuthRequired {
            user?: string;
        }
        export interface TeamBillableInfoResponse extends Response {
            billable_info: {
                [user: string]: {
                    billing_active: boolean;
                };
            };
        }
        export interface TeamInfoParameters extends ParametersAuthRequired { }
        export interface TeamInfoResponse extends Response {
            team: {
                id: string;
                name: string;
                domain: string;
                email_domain: string;
                icon: {
                    image_34: string;
                    image_44: string;
                    image_68: string;
                    image_88: string;
                    image_102: string;
                    image_132: string;
                    image_default: boolean;
                };
                enterprise_id?: string;
                enterprise_name?: string;
            };
        }
        export interface TeamIntegrationLogsParameters extends ParametersAuthRequired {
            service_id?: string;
            app_id?: string;
            user?: string;
            change_type?: 'added' | 'removed' | 'enabled' | 'disabled' | 'updated';
            count?: number;
            page?: number;
        }
        export interface TeamIntegrationLogsResponse extends Response {
            logs: ({
                user_id: string;
                user_name: string;
                channel: string;
                date: string;
                change_type: 'added' | 'removed' | 'enabled' | 'disabled' | 'updated';
                reason?: string;
                scope: string;
                rss_feed?: boolean;
                rss_feed_change_type?: string;
                rss_feed_title?: string;
                rss_feed_url?: string;
            } & ({
                app_id: string;
                app_type: string;
            } | {
                    service_id: string;
                    service_type: string;
                }))[];
            paging: Paging;
        }
        export interface TeamProfileGetParameters extends ParametersAuthRequired {
            visibility?: 'all' | 'visible' | 'hidden';
        }
        export interface TeamProfileGetResponse extends Response {
            profile: {
                fields: {
                    id: string;
                    ordering: number;
                    label: string;
                    hint: string;
                    type: string;
                    possible_values: string[] | null;
                    options: object | null;
                    is_hidden?: boolean;
                }[]
            }
        }

        // usergroups
        export interface UsergroupsCreateParameters extends ParametersAuthRequired {
            name: string;
            handle?: string;
            description?: string;
            channels?: string;
            include_count?: boolean;
        }
        export interface UsergroupsCreateResponse extends Response {
            usergroup: Usergroup;
        }
        export interface UsergroupsDisableParameters extends ParametersAuthRequired {
            usergroup: string;
            include_count?: boolean;
        }
        export interface UsergroupsDisableResponse extends Response {
            usergroup: Usergroup;
        }
        export interface UsergroupsEnableParameters extends ParametersAuthRequired {
            usergroup: string;
            include_count?: boolean;
        }
        export interface UsergroupsEnableResponse extends Response {
            usergroup: Usergroup;
        }
        export interface UsergroupsListParameters extends ParametersAuthRequired {
            include_disabled?: boolean;
            include_count?: boolean;
            include_users?: boolean;
        }
        export interface UsergroupsListResponse extends Response {
            usergroups: Usergroup[];
        }
        export interface UsergroupsUpdateParameters extends ParametersAuthRequired {
            usergroup: string;
            name?: string;
            handle?: string;
            description?: string;
            channels?: string;
            include_count?: boolean;
        }
        export interface UsergroupsUpdateResponse extends Response {
            usergroup: Usergroup;
        }
        export interface UsergroupsUsersListParameters extends ParametersAuthRequired {
            usergroup: string;
            include_disabled?: boolean;
        }
        export interface UsergroupsUsersListResponse extends Response {
            users: string[];
        }
        export interface UsergroupsUsersUpdateParameters extends ParametersAuthRequired {
            usergroup: string;
            users: string;
            include_count?: boolean;
        }
        export interface UsergroupsUsersUpdateResponse extends Response {
            usergroup: Usergroup;
        }

        // users
        export interface UsersDeletePhotoParameters extends ParametersAuthRequired { }
        export interface UsersDeletePhotoResponse extends Response { }
        export interface UsersGetPresenceParameters extends ParametersAuthRequired {
            user: string;
        }
        export interface UsersGetPresenceResponse extends Response {
            presence: Presence;
        }
        export interface UsersIdentityParameters extends ParametersAuthRequired { }
        export interface UsersIdentityResponse extends Response {
            user: {
                name: string;
                id: string;
                email?: string;
                image_24?: string;
                image_32?: string;
                image_48?: string;
                image_72?: string;
                image_192?: string;
            };
            team: {
                id: string;
                name?: string;
            }
        }
        export interface UsersInfoParameters extends ParametersAuthRequired {
            user: string;
        }
        export interface UsersInfoResponse extends Response {
            user: User;
        }
        export interface UsersListParameters extends ParametersAuthRequired {
            presence?: boolean;
        }
        export interface UsersListResponse extends Response {
            members: User[];
        }
        export interface UsersSetActiveParameters extends ParametersAuthRequired { }
        export interface UsersSetActiveResponse extends Response { }
        export interface UsersSetPhotoParameters extends ParametersAuthRequired {
            image: ReadStream;
            crop_x?: number;
            crop_y?: number;
            crop_w?: number;
        }
        export interface UsersSetPhotoResponse extends Response { }
        export interface UsersSetPresenceParameters extends ParametersAuthRequired {
            presence: 'auto' | 'away';
        }
        export interface UsersSetPresenceResponse extends Response { }
        export interface UsersProfileGetParameters extends ParametersAuthRequired {
            user?: string;
            include_labels?: boolean;
        }
        export interface UsersProfileGetResponse extends Response {
            profile: Profile;
        }
        export interface UsersProfileSetParameters extends ParametersAuthRequired {
            user?: string;
            profile?: string;
            name?: string;
            value?: string;
        }
        export interface UsersProfileSetResponse extends Response {
            profile: Profile;
        }
    }

    export namespace EventsApi {
        export interface BaseEvent {
            type: 'url_verification' | 'event_callback';
            token: string;
        }
        export interface UrlVerificationEvent extends BaseEvent {
            type: 'url_verification';
            challenge: string;
        }
        export interface Event extends BaseEvent {
            team_id: string;
            api_app_id: string;
            event: InnerEvent;
            type: 'event_callback';
            authed_users: string[];
            event_id: string;
            event_time: string;
        }
        type InnerEvent = ChannelArchiveEvent | ChannelCreatedEvent | ChannelDeletedEvent | ChannelHistoryChangedEvent |
            ChannelRenameEvent | ChannelUnarchiveEvent | DndUpdatedEvent | DndUpdatedUserEvent | EmailDomainChangedEvent |
            EmojiChangedEvent | FileChangeEvent | FileCommentAddedEvent | FileCommentDeletedEvent | FileCommentEditedEvent |
            FileCreatedEvent | FileDeletedEvent | FilePublicEvent | FileSharedEvent | FileUnsharedEvent | GroupArchiveEvent |
            GroupCloseEvent | GroupHistoryChangedEvent | GroupOpenEvent | GroupRenameEvent | GroupUnarchiveEvent | ImCloseEvent |
            ImCreatedEvent | ImHistoryChangedEvent | ImOpenEvent | LinkSharedEvent | MessageEvent | MessageChannelsEvent |
            MessageGroupsEvent | MessageImEvent | MessageMpimEvent | PinAddedEvent | PinRemovedEvent | ReactionAddedEvent |
            ReactionRemovedEvent | StarAddedEvent | StarRemovedEvent | SubteamCreatedEvent | SubteamSelfAddedEvent |
            SubteamSelfRemovedEvent | SubteamUpdatedEvent | TeamDomainChangeEvent | TeamJoinEvent | TeamRenameEvent |
            UrlVerificationEvent | UserChangeEvent;
        export interface ChannelArchiveEvent {
            type: 'channel_archive';
            user: string;
            channel: string;
        }
        export interface ChannelCreatedEvent {
            type: 'channel_created';
            channel: {
                id: string;
                name: string;
                created: number;
                creator: string;
            };
        }
        export interface ChannelDeletedEvent {
            type: 'channel_deleted';
            channel: string;
        }
        export interface ChannelHistoryChangedEvent {
            type: 'channel_history_changed';
            latest: string;
            ts: string;
            event_ts: string;
        }
        export interface ChannelRenameEvent {
            type: 'channel_rename';
            channel: {
                id: string;
                name: string;
                created: number;
            }
        }
        export interface ChannelUnarchiveEvent {
            type: 'channel_unarchive';
            user: string;
            channel: string;
        }
        export interface DndUpdatedEvent {
            type: 'dnd_updated';
            user: string;
            dnd_status: {
                dnd_enabled: boolean;
                next_dnd_start_ts: number;
                next_dnd_end_ts: number;
                snooze_enabled: boolean;
                snooze_endtime: number;
            };
        }
        export interface DndUpdatedUserEvent {
            type: 'dnd_updated_user';
            user: string;
            dnd_status: {
                dnd_enabled: boolean;
                next_dnd_start_ts: number;
                next_dnd_end_ts: number;
            };
        }
        export interface EmailDomainChangedEvent {
            type: 'email_domain_changed';
            email_domain: string;
            event_ts: string;
        }
        type EmojiChangedEvent = EmojiChangedAddedEvent | EmojiChangedRemovedEvent;
        interface EmojiChangedBaseEvent {
            type: 'emoji_changed';
            event_ts: string;
        }
        export interface EmojiChangedAddedEvent extends EmojiChangedBaseEvent {
            subtype: 'add';
            name: string;
            value: string;
        }
        export interface EmojiChangedRemovedEvent extends EmojiChangedBaseEvent {
            subtype: 'remove';
            names: string[];
        }
        export interface FileChangeEvent {
            type: 'file_change';
            file: File;
        }
        export interface FileCommentAddedEvent {
            type: 'file_comment_added';
            file: File;
            comment: FileComment;
        }
        export interface FileCommentDeletedEvent {
            type: 'file_comment_deleted';
            file: File;
            comment: string;
        }
        export interface FileCommentEditedEvent {
            type: 'file_comment_edited';
            file: File;
            comment: FileComment;
        }
        export interface FileCreatedEvent {
            type: 'file_created';
            file: File;
        }
        export interface FileDeletedEvent {
            type: 'file_deleted';
            file_id: string;
            event_ts: string;
        }
        export interface FilePublicEvent {
            type: 'file_public';
            file: File;
        }
        export interface FileSharedEvent {
            type: 'file_shared';
            file: File;
        }
        export interface FileUnsharedEvent {
            type: 'file_unshared';
            file: File;
        }
        export interface GroupArchiveEvent {
            type: 'group_archive';
            channel: string;
        }
        export interface GroupCloseEvent {
            type: 'group_close';
            user: string;
            channel: string;
        }
        export interface GroupHistoryChangedEvent {
            type: 'group_history_changed';
            latest: string;
            ts: string;
            event_ts: string;
        }
        export interface GroupOpenEvent {
            type: 'group_open';
            user: string;
            channel: string;
        }
        export interface GroupRenameEvent {
            type: 'group_rename';
            channel: {
                id: string;
                name: string;
                created: number;
            }
        }
        export interface GroupUnarchiveEvent {
            type: 'group_unarchive';
            channel: string;
        }
        export interface ImCloseEvent {
            type: 'im_close';
            user: string;
            channel: string;
        }
        export interface ImCreatedEvent {
            type: 'im_created';
            user: string;
            channel: Channel;
        }
        export interface ImHistoryChangedEvent {
            type: 'im_history_changed';
            latest: string;
            ts: string;
            event_ts: string;
        }
        export interface ImOpenEvent {
            type: 'im_open';
            user: string;
            channel: string;
        }
        export interface LinkSharedEvent {
            type: 'link_shared';
            channel: string;
            user: string;
            message_ts: string;
            links: LinkPayload[];
        }
        export interface MessageEvent {
            type: 'message';
            channel: string;
            user: string;
            text: string;
            ts: string;
        }
        export interface MessageChannelsEvent {
            type: 'message.channels';
            channel: string;
            user: string;
            text: string;
            ts: string;
        }
        export interface MessageGroupsEvent {
            type: 'message.groups';
            channel: string;
            user: string;
            text: string;
            ts: string;
        }
        export interface MessageImEvent {
            type: 'message.im';
            channel: string;
            user: string;
            text: string;
            ts: string;
        }
        export interface MessageMpimEvent {
            type: 'message.mpim';
            channel: string;
            user: string;
            text: string;
            ts: string;
        }
        export interface PinAddedEvent {
            type: 'pin_added';
            user: string;
            channel_id: string;
            item: object;
            event_ts: string;
        }
        export interface PinRemovedEvent {
            type: 'pin_removed';
            user: string;
            channel_id: string;
            item: object;
            has_pins: boolean;
            event_ts: string;
        }
        export interface ReactionAddedEvent {
            type: 'reaction_added';
            user: string;
            reaction: string;
            item_user: string;
            item: MessagePayloadLight | FilePayloadLight | FileCommentPayloadLight;
            event_ts: string;
        }
        export interface ReactionRemovedEvent {
            type: 'reaction_removed';
            user: string;
            reaction: string;
            item_user: string;
            item: MessagePayloadLight | FilePayloadLight | FileCommentPayloadLight;
            event_ts: string;
        }
        export interface StarAddedEvent {
            type: 'star_added';
            user: string;
            event_ts: string;
            items: (MessagePayload | FilePayload | FileCommentPayload | ChannelPayload | ImPayload | GroupPayload)[];
        }
        export interface StarRemovedEvent {
            type: 'star_removed';
            user: string;
            event_ts: string;
            items: (MessagePayload | FilePayload | FileCommentPayload | ChannelPayload | ImPayload | GroupPayload)[];
        }
        export interface SubteamCreatedEvent {
            type: 'subteam_created';
            subteam: Usergroup;
        }
        export interface SubteamSelfAddedEvent {
            type: 'subteam_self_added';
            subteam_id: string;
        }
        export interface SubteamSelfRemovedEvent {
            type: 'subteam_self_removed';
            subteam_id: string;
        }
        export interface SubteamUpdatedEvent {
            type: 'subteam_updated';
            subteam: Usergroup;
        }
        export interface TeamDomainChangeEvent {
            type: 'team_domain_change';
            url: string;
            domain: string;
        }
        export interface TeamJoinEvent {
            type: 'team_join';
            user: User;
        }
        export interface TeamRenameEvent {
            type: 'team_rename';
            name: string;
        }
        export interface UserChangeEvent {
            type: 'user_change';
            user: User;
        }
    }
}