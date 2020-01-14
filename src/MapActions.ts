import { FolderTypes, ErrorTypes } from './constants';

export enum ActionTypes {
    SET_MAILS = 'SET_MAILS',
    SET_SELECTED_FOLDER = 'SET_SELECTED_FOLDER',
    SET_SELECTED_ACCOUNT = 'SET_SELECTED_ACCOUNT',
    SET_SELECTED_MAIL_DISPLAY = 'SET_SELECTED_MAIL_DISPLAY',
    SET_MAIL_READ = 'SET_MAIL_READ',
    CHECK_BOX_CHANGE = 'CHECK_BOX_CHANGE',
    CHECK_BOX_CHANGE_ALL = 'CHECK_BOX_CHANGE_ALL',
    DELETE_SELECTED = 'DELETE_SELECTED',
    SET_ERROR = 'SET_ERROR',
    SET_LOADING = 'SET_LOADING',
    CLEAR_ID_DELETE = 'CLEAR_ID_DELETE'
}


//Interface of data
interface T_ReceiveMails{
    accounts: T_Accounts[]
}

export interface T_AccountDetails{
    name: string,
    address: string
}

export interface T_Accounts{
    address: string,
    mail: T_Mail[],
    name: string,
    surname: string
}

export interface T_Mail {
    id: string, //receiver+date+sender
    content: string,
    date: number,
    senderEmail: string,
    senderName: string,
    subject: string,
    receiverEmail: string,
    folder: FolderTypes,
    read: boolean
}

export interface T_UserToMailMap {
    [key: string]: string[]
}

export interface T_IdToMailMap {
    [key: string]: T_Mail
}


//Interfaces of dispatched actions
interface ReceiveMailData {
    type: ActionTypes.SET_MAILS,
    payload?: T_ReceiveMails 
}

interface SetSelectedFolder {
    type: ActionTypes.SET_SELECTED_FOLDER,
    selectedFolder: FolderTypes
}

interface SetSelectedAccount {
    type: ActionTypes.SET_SELECTED_ACCOUNT,
    selectedAccountMailId: string
}

interface SetSelectedMailToDisplay {
    type: ActionTypes.SET_SELECTED_MAIL_DISPLAY,
    selectedMailToDisplay: string
}

interface ChackBoxChangeAction {
    type: ActionTypes.CHECK_BOX_CHANGE,
    id: string,
    check: boolean
}

interface CheckBoxChangeAllAction {
    type: ActionTypes.CHECK_BOX_CHANGE_ALL,
    deleteMailIds: string[]
}

interface SetMailToRead {
    type: ActionTypes.SET_MAIL_READ,
    mailId: string
}

interface DeleteSelected {
    type: ActionTypes.DELETE_SELECTED,
    mailId: string
}

interface SetError {
    type: ActionTypes.SET_ERROR,
    error: ErrorTypes
}

interface SetLoading {
    type: ActionTypes.SET_LOADING
}

interface ClearIdDeleteList {
    type: ActionTypes.CLEAR_ID_DELETE
}

export type MapActions = ReceiveMailData
    | SetSelectedFolder
    | SetSelectedAccount
    | SetSelectedMailToDisplay
    | SetMailToRead
    | ChackBoxChangeAction
    | CheckBoxChangeAllAction
    | DeleteSelected
    | SetError
    | SetLoading
    | ClearIdDeleteList