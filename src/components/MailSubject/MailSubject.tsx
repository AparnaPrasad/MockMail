import React from 'react';
import { useMapState } from '../../MapProvider';
import { Container, Row, ButtonGroup, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { TiArrowForward } from 'react-icons/ti';
import { TiArrowBack } from 'react-icons/ti';

const MailSubject: React.FC = () => {
    const { mapState: { selectedMailIdDisplay, idToMailMap },
    } = useMapState();
    const styles = {
        subjectContainer: {
            padding: '10px',
            margin: '10px 20px'
        }
    }
    const StyledSubject = styled.div`
        font-size: 23px;
        font-weight: 400;
        flex-grow: 1;
   `
    return (<Container fluid style={styles.subjectContainer}>
        <Row>
            <StyledSubject >{selectedMailIdDisplay ? idToMailMap[selectedMailIdDisplay].subject : null}</StyledSubject>
            <ButtonGroup aria-label="Basic example">
                <Button variant="outline-secondary"><TiArrowBack/></Button>
                <Button variant="outline-secondary"><TiArrowForward/></Button>
            </ButtonGroup>
        </Row>
    </Container>);
}

export default MailSubject;