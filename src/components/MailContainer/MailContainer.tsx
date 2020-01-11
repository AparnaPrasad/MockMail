import React from 'react';
import { FolderTypes, FolderList } from '../../constants';
import { Button, Container, Row } from 'react-bootstrap';
import './MailContainer.scss';
import MailControls from '../MailControls/MailControls';
import MailsDisplay from '../MailsDisplay/MailsDisplay';
import Header from '../Header/Header';
const styles = {
    listElement:{
        listStyle: 'none'
    }
}

const MailContainer: React.FC = () => {
    
  return (<div className="mails-container">
    <Header/>   
    <MailControls/>
    <MailsDisplay/>
</div>
 );
}

export default MailContainer;
