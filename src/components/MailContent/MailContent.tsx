import React from 'react';
import { useMapState } from '../../MapProvider';
import { Container, Col } from 'react-bootstrap';
import styled from 'styled-components';

const StyledPara = styled.p`
 white-space: pre;
`
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
                {selectedMailIdDisplay ? idToMailMap[selectedMailIdDisplay].content.split(('\n')).map((item, index) => (<StyledPara key={index} className={'mail-content'}>{item}</StyledPara>)) : null}
            </Col>
        </Container>);
}

export default MailContent;