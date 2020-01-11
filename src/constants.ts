export enum FolderTypes {
    T_INBOX="Inbox",
    T_DRAFTS="Drafts",
    T_SENT="Sent",
    T_SPAM="Spam",
    T_TRASH="Trash"
}

export const FolderList: FolderTypes[] = [FolderTypes.T_INBOX, FolderTypes.T_DRAFTS, 
    FolderTypes.T_SENT,
    FolderTypes.T_SPAM,
    FolderTypes.T_TRASH ]

export const baseUrl = 'http://localhost:8000'