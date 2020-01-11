export enum ActionTypes {
    SET_MAILS = 'SET_MAILS'
}


//Interface of received data
interface T_ReceiveMails{
    accounts: T_Accounts[]
}

export interface T_AccountList{
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
    receiverEmail: string
}

export interface T_UserToMailMap {
    [key: string]: string[]
}

export interface T_IdToMailMap {
    [key: string]: T_Mail
}

interface ReceiveMailData {
    type: ActionTypes.SET_MAILS,
    payload?: T_ReceiveMails 
}

export type MapActions =
  | {
      type: 'setFeatureRef';
      nextFeatureRef: any;
    }
  | {
      type: 'resetFeatureRef';
    } 
  | ReceiveMailData