import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import { Container } from 'react-bootstrap';

test('renders app without crashing', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(Container).length).toEqual(1);
})

