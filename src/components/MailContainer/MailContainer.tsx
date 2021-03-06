import React from 'react';
import MailControls from '../MailControls/MailControls';
import MailsDisplay from '../MailsDisplay/MailsDisplay';
import Header from '../Header/Header';

const styles = {
    containerStyles: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        height: '100vh'
    }
}

const MailContainer: React.FC = () => {
    return (<div style={styles.containerStyles}>
        <Header/>   
        <MailControls />
        <MailsDisplay />
    </div>
 );
}

export default MailContainer;
