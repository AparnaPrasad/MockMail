import React from 'react';
import { shallow } from 'enzyme';
import MailList from './MailList';
import { initialState } from '../../MapState';
import { FolderTypes } from '../../constants';
import * as MapProvider from '../../MapProvider'

describe("test mail list component", () => {
    it("should display all mails in the selected folder", () => {
        const contextValues = {
            mapState: {
                ...initialState,
                selectedFolder: FolderTypes.T_SPAM,
                userSpam: ["test-mail-1", "test-mail-2", "test-mail-3"],
                
            },
            setMapState: () => { }
        };
        jest.spyOn(MapProvider, "useMapState").mockImplementation(() => (contextValues));

        const wrapper = shallow(<MailList />)
        expect(wrapper.find('[data-testid="mail-list-item"]')).toHaveLength(3);
    })
})