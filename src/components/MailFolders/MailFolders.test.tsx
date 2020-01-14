import React from 'react';
import MailFolders from './MailFolders';
import { shallow } from 'enzyme';
import { FolderList } from '../../constants';

describe(('renders side bar correctly'), () => {

    it('should render list of folders', () => {
        //const folderList =
        const wrapper = shallow(<div>
            {FolderList.map((folder) => (<div key={folder}>{folder}</div>))}

        </div>);
        expect(wrapper).toMatchSnapshot();
    });

    it('should have a compose button', () => {

        const wrapper = shallow(<MailFolders/>)
        //There should be only one button
        expect(wrapper.find('Button')).toHaveLength(1);

        

        //Button should have matching text
        expect(wrapper.find('Button').text()).toEqual('Compose');
    });
})

