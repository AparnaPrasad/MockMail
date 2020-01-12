import React from 'react';
//import { MapContext, useMapState } from '../../MapProvider'
import { initialState } from '../../MapState'
import * as MapProvider from '../../MapProvider'
import Header from './Header';
import { mount } from 'enzyme';

describe(('it should render header correctly'), () => {
    const accountName = 'Apbs';
    it('should render drop down with selected account', () => {
        const contextValues = {
            mapState: {
                ...initialState,
                selectedAccount: {
                    name: accountName,
                    address: 'apbs@sdf.com'
                }
            },
            setMapState: () => { }
        };
        jest.spyOn(MapProvider, "useMapState").mockImplementation(() => (contextValues));
        const wrapper = mount(<Header />)
        expect(wrapper.find('button.dropdown-toggle.btn#accountDropDown').text()).toBe(accountName);
    }),
    it("should display No Accounts if there is no selected account", () => {
        const contextValues = {
            mapState: {
                ...initialState,
            },
            setMapState: () => { }
        };
        jest.spyOn(MapProvider, "useMapState").mockImplementation(() => (contextValues));
        const wrapper = mount(<Header />)
        expect(wrapper.find('button.dropdown-toggle.btn#accountDropDown').text()).toBe('No Accouunts');

    })
})