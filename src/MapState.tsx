import React from 'react';
import {MapActions, ActionTypes, T_Accounts, T_AccountList, T_UserToMailMap, T_Mail, T_IdToMailMap} from './MapActions';

export type MapState = {
  /** The map feature reference */
  featureRef: any | null;
  accountList: T_AccountList[],
  selectedAccount?: string,
  userToMailMap: T_UserToMailMap,
  idToMailMap: T_IdToMailMap,
  userInbox: string[],
  userDrafts: string[],
  userSent: string[],
  userSpam:string[],
  userTrash: string[]
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
    userTrash: []

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
      case ActionTypes.SET_MAILS:
        const accounts = (action?.payload?.accounts)||[];
        const list_of_all_mails: T_Mail[] = accounts?.reduce((prev: any[], curr)=>(prev.concat((curr.mail.map((m: any)=>({
          ...m, 
          receiverEmail: curr.address,
          id: curr.address + m.date + m["sender email"] , //receiver+date+sender
          senderEmail: m["sender email"],
          senderName: m["sender name"]
          
        }))))),[]);

        const new_state = {
            ...state,
            accountList: accounts.filter((acc:T_Accounts)=>(acc.mail)).map((acc:T_Accounts)=>({
                name: `${acc.name} ${acc.surname}` ,
                address: acc.address
            })),
            selectedAccount: accounts[0]?.address,
            userToMailMap: list_of_all_mails.reduce(function (prev: T_UserToMailMap, curr: T_Mail){
              prev[curr.receiverEmail]=(prev[curr.receiverEmail]||[]).concat(curr.id);
              return prev;
            }, {} as T_UserToMailMap),//not sure if needed TODO
            idToMailMap: list_of_all_mails.reduce((prev: T_IdToMailMap, curr: T_Mail)=>{ 
              prev[curr.id] = curr;
              return prev;
            }, {})
        
        };
        console.log("new_state", new_state);
        return new_state;
      default:
        return state;
    }
  };
