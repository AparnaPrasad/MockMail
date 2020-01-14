import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import { Container } from 'react-bootstrap';
import { reducer, initialState } from '../../MapState'
import { ActionTypes } from '../../MapActions';

describe('it should render app without crashing', () => {
    it(' should render app without crashing', () => {
        const wrapper = shallow(<App />)
        expect(wrapper.find(Container).length).toEqual(1);
    }),
    it('should set error if data received does not contains account', () => {
        const state = {
            ...initialState
        }
        const newState = reducer(state, { type: ActionTypes.SET_MAILS, payload: { accounts: [] } })
        expect(newState.error).toBeTruthy();
    })
})




