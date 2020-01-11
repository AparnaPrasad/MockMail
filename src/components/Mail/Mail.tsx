import MailLayout from '../MailLayout/MailLayout';
import React from 'react'; 
import MailDetails from '../MailDetails/MailDetails';
import MailContent from '../MailContent/MailContent';

const Mail: React.FC = () => {
    return <MailLayout>
            <MailDetails/>
            <MailContent/>
        </MailLayout>
}

export default Mail;
