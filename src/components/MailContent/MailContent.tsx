import React from 'react';
import { useMapState } from '../../MapProvider';
import { Container, Col } from 'react-bootstrap';
import './MailContent.scss';
const MailContent: React.FC = () => {
    const styles = {
        mailContentContainer: {
            overflow: 'auto'
        }
    }
    const { mapState: { selectedMailIdDisplay, idToMailMap },
    } = useMapState();

    return (
        <Container style={styles.mailContentContainer} >
            <Col> 
                {selectedMailIdDisplay ? idToMailMap[selectedMailIdDisplay].content.split(('\n')).map((item, index) => (<p key={index} className={'mail-content'}>{item}</p>)) : null}
            </Col>
        </Container>);
}

export default MailContent;