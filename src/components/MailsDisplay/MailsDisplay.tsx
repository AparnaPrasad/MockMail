import React from 'react'; 
import { commonStyles } from '../../styles/commonStyles';
import { Container, Col, Row } from 'react-bootstrap';
import MailLayout from '../MailLayout/MailLayout';
import MailSubject from '../MailSubject/MailSubject';
import Mail from '../Mail/Mail';
import MailList from '../MailList/MailList';

const styles = {
    mailsDisplay:{
        flex: 1,
    }
}
const MailsDisplay: React.FC = () => {
    return <Container fluid style={styles.mailsDisplay}>
        <Row style={commonStyles.heightFull}>
            <Col xl={4} lg={4} md={3} sm={3} xs={3} style={commonStyles.borderTest}>
            <MailList/>
            </Col>
            <Col xl={8} lg={8} md={9} sm={9} xs={9} style={commonStyles.borderTest}>
                <MailLayout>
                    <MailSubject/>
                    <Mail/>
                </MailLayout>
            </Col>
        </Row>
    </Container>
}

export default MailsDisplay;