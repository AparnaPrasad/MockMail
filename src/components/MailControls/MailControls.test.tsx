import React from 'react';
import { mount } from 'enzyme';
import MailControls from './MailControls';
import { initialState } from '../../MapState';
import { FolderTypes } from '../../constants';
import * as MapProvider from '../../MapProvider'

describe("test mail controls", () => {
    it("should disable delete button trash folder", () => {
        const contextValues = {
            mapState: {
                ...initialState,
                selectedFolder: FolderTypes.T_TRASH
            },
            setMapState: () => { }
        };
        jest.spyOn(MapProvider, "useMapState").mockImplementation(() => (contextValues));

        mount(<MailControls />).contains(`button#delete-button[disabled]`);
    })
})