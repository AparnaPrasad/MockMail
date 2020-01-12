import React from 'react';
import { MapActions, ActionTypes, T_Accounts, T_AccountDetails, T_UserToMailMap, T_Mail, T_IdToMailMap } from './MapActions';
import { FolderTypes } from './constants';
import { getMailList } from './utils/getMailFolderKey';

export type MapState = {
  /** The map feature reference */
  featureRef: any | null;
  accountList: T_AccountDetails[],
  selectedAccount?: T_AccountDetails,
  userToMailMap: T_UserToMailMap,
  idToMailMap: T_IdToMailMap,
  userInbox: string[],
  userDrafts: string[],
  userSent: string[],
  userSpam:string[],
  userTrash: string[],
  selectedFolder: FolderTypes,
  selectedMailIdDisplay?: string,
  idsToDelete: string[]
};



export const initialState: MapState = {
    featureRef: "test",
    accountList: [],
    selectedAccount: undefined,
    userToMailMap: {},
    idToMailMap: {},
    userInbox: [],
    userDrafts: [],
    userSent: [],
    userSpam:[],
    userTrash: [],
    selectedFolder: FolderTypes.T_INBOX,
    selectedMailIdDisplay: undefined,
    idsToDelete: []
}

export const reducer = (state: MapState, action: MapActions) => {
    switch (action.type) {
        case 'setFeatureRef':
            return {
                ...state,
              // if we had other state I would spread it here: ...state,
              featureRef: action.nextFeatureRef
            };
        case 'resetFeatureRef':
            return {
                ...state,
              featureRef: null
            };
        case ActionTypes.SET_MAILS: {
            const accounts = (action?.payload?.accounts) || [];
            const selectedAccount = accounts[0];
            if (!selectedAccount) {
                return state;
            }
            const list_of_all_mails: T_Mail[] = accounts?.reduce((prev: any[], curr) => (prev.concat((curr.mail.map((m: any) => ({
                ...m,
                receiverEmail: curr.address,
                id: curr.address + m.date + m["sender email"], //receiver+date+sender
                senderEmail: m["sender email"],
                senderName: m["sender name"],
                read: Boolean(m.read)

            }))))), []).sort((a: T_Mail, b: T_Mail) => (a.date > b.date ? -1 : 1));
            const selectedMailsList = list_of_all_mails.filter((mail) => mail.receiverEmail === selectedAccount.address)
            const new_state = {
                ...state,
                accountList: accounts.filter((acc: T_Accounts) => (acc.mail)).map((acc: T_Accounts) => ({
                    name: `${acc.name} ${acc.surname}`,
                    address: acc.address
                })),
                selectedAccount: {
                    ...state.selectedAccount,
                    name: `${accounts[0]?.name} ${accounts[0]?.surname}`,
                    address: accounts[0].address
                },
                userToMailMap: list_of_all_mails.reduce(function (prev: T_UserToMailMap, curr: T_Mail) {
                    prev[curr.receiverEmail] = (prev[curr.receiverEmail] || []).concat(curr.id);
                    return prev;
                }, {} as T_UserToMailMap),
                idToMailMap: list_of_all_mails.reduce((prev: T_IdToMailMap, curr: T_Mail) => {
                    prev[curr.id] = curr;
                    return prev;
                }, {}), //all emails by id
                userInbox: selectedMailsList.filter((mail) =>
                    (mail.folder === FolderTypes.T_INBOX)).map((mail) => (mail.id)),
                userDrafts: selectedMailsList.filter((mail) =>
                    (mail.folder === FolderTypes.T_DRAFTS)).map((mail) => (mail.id)),
                userSpam: selectedMailsList.filter((mail) =>
                    (mail.folder === FolderTypes.T_SPAM)).map((mail) => (mail.id)),
                userSent: selectedMailsList.filter((mail) =>
                    (mail.folder === FolderTypes.T_SENT)).map((mail) => (mail.id)),
                userTrash: selectedMailsList.filter((mail) =>
                    (mail.folder === FolderTypes.T_TRASH)).map((mail) => (mail.id)),

            };
            return new_state;
        }
        case ActionTypes.SET_SELECTED_FOLDER: {
            return {
                ...state,
                selectedFolder: action.selectedFolder,
                selectedMailIdDisplay: undefined,
                idsToDelete: []
            }
        }
        case ActionTypes.SET_SELECTED_ACCOUNT: {
            const { selectedAccountMailId } = action;
            const newSelectedAccountDetails = state.accountList.find((account) => (account.address === selectedAccountMailId))
            const newSelectedUserMail = state.userToMailMap[selectedAccountMailId];
            if (!newSelectedAccountDetails)
                return state;
            return {
                ...state,
                selectedAccount:  {
                    ...state.selectedAccount,
                    name: newSelectedAccountDetails.name,
                    address: newSelectedAccountDetails.address
                },
                userInbox: newSelectedUserMail.filter((mailId) =>
                    (state.idToMailMap[mailId].folder === FolderTypes.T_INBOX)),
                userDrafts: newSelectedUserMail.filter((mailId) =>
                    (state.idToMailMap[mailId].folder === FolderTypes.T_DRAFTS)),
                userSpam: newSelectedUserMail.filter((mailId) =>
                    (state.idToMailMap[mailId].folder === FolderTypes.T_SPAM)),
                userSent: newSelectedUserMail.filter((mailId) =>
                    (state.idToMailMap[mailId].folder === FolderTypes.T_SENT)),
                userTrash: newSelectedUserMail.filter((mailId) =>
                    (state.idToMailMap[mailId].folder === FolderTypes.T_TRASH)),
                selectedMailIdDisplay: undefined,
                idsToDelete: []

            }
        }
        case ActionTypes.SET_SELECTED_MAIL_DISPLAY:
            return {
                ...state,
                selectedMailIdDisplay: action.selectedMailToDisplay
            }
        case ActionTypes.SET_MAIL_READ:
            return {
                ...state,
                idToMailMap: {
                    ...state.idToMailMap,
                    [action.mailId]: {
                        ...state.idToMailMap[action.mailId],
                        read: true
                    }
                }
            }
        case ActionTypes.CHECK_BOX_CHANGE: {
            return {
                ...state,
                idsToDelete: action.check ? [...state.idsToDelete, action.id] : state.idsToDelete.filter((id) => (id !== action.id))
            }
        }
        case ActionTypes.CHECK_BOX_CHANGE_ALL: {
            return {
                ...state,
                idsToDelete: action.deleteMailIds
            }
        }
        case ActionTypes.DELETE_SELECTED: {
            const currentFolder = getMailList(state.selectedFolder);
            return {
                ...state,
                [currentFolder]: state[currentFolder].filter((id: string) => (id !== action.mailId)),
                userTrash: state.userTrash.concat(action.mailId),
                idToMailMap: {
                    ...state.idToMailMap,
                    [action.mailId]: {
                        ...state.idToMailMap[action.mailId],
                        folder: FolderTypes.T_TRASH
                    }
                }
            }
        }
        default:
            return state;
    }
  };
