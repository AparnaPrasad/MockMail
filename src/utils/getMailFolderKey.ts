import { MapState } from "../MapState";
import { FolderTypes } from "../constants";

export const getMailList = (selectedFolder: FolderTypes): keyof MapState => {
    //let folderKey: keyof MapState;
    switch (selectedFolder) {
        case FolderTypes.T_INBOX:
            return 'userInbox';
        case FolderTypes.T_SENT:
            return 'userSent';
        case FolderTypes.T_SPAM:
            return 'userSpam';
        case FolderTypes.T_TRASH:
            return 'userTrash';
        case FolderTypes.T_DRAFTS:
            return 'userDrafts';
        default:
            return 'userInbox';
    }

}
