import React from 'react'; 
import { commonStyles } from '../../styles/commonStyles';
import { Container, Col, Row } from 'react-bootstrap';
import MailLayout from '../MailLayout/MailLayout';
import MailSubject from '../MailSubject/MailSubject';
import Mail from '../Mail/Mail';
import MailList from '../MailList/MailList';
import { useMapState } from '../../MapProvider';

const styles = {
    mailsDisplay:{
        flex: 1,
        minHeight: 0
        
    },
    colMaxHeight: {
        maxHeight: '100%'
    }
}
const MailsDisplay: React.FC = () => {
    const {
        mapState: {  selectedMailIdDisplay },
    } = useMapState();
    return <Container fluid style={styles.mailsDisplay}>
        <Row style={commonStyles.heightFull}>
            <Col xl={4} lg={4} md={3} sm={3} xs={3} style={{ ...commonStyles.paddingNone, ...styles.colMaxHeight }}>
            <MailList/>
            </Col>
            <Col xl={8} lg={8} md={9} sm={9} xs={9} style={{ ...commonStyles.paddingNone, ...styles.colMaxHeight }}>
                 <MailLayout>
                    {selectedMailIdDisplay && <MailSubject />}
                    {selectedMailIdDisplay && <Mail />}
                </MailLayout>
            </Col>
        </Row>
    </Container>
}

export default MailsDisplay;