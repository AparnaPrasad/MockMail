import React from 'react';
import { shallow } from 'enzyme';
import { initialState } from '../../MapState';
import { FolderTypes } from '../../constants';
import * as MapProvider from '../../MapProvider'


const idToMailMap = {
    mail1: {
        id: "mail1", 
        content: "some content",
        date: 123223,
        senderEmail: "test@test.com",
        senderName: "tester",
        subject: "testing test",
        receiverEmail: "apbs@bd.com",
        folder: FolderTypes.T_INBOX,
        read: true
    },
    mail2: {
        id: "mail2", 
        content: "some content",
        date: 123223,
        senderEmail: "test@test.com",
        senderName: "tester",
        subject: "testing test",
        receiverEmail: "apbs@bd.com",
        folder: FolderTypes.T_INBOX,
        read: true
    },
    mail3: {
        id: "mail3", 
        content: "some content",
        date: 123223,
        senderEmail: "test@test.com",
        senderName: "tester",
        subject: "testing test",
        receiverEmail: "apbs@bd.com",
        folder: FolderTypes.T_INBOX,
        read: false
    }


};

describe("Test UnreadCount component ", () => {
    it("should display unread mails in the inbox", () => {
        const contextValues = {
            mapState: {
                ...initialState,
                selectedFolder: FolderTypes.T_SPAM,
                userInbox: ["mail1", "mail2", "mail3"],
                idToMailMap: idToMailMap
            },
            setMapState: () => { }
        };
        jest.spyOn(MapProvider, "useMapState").mockImplementation(() => (contextValues));

        const wrapper = shallow(<span>(1)</span>);
        expect(wrapper).toMatchSnapshot();
    })
})