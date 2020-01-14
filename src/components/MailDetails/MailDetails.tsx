import React from 'react';
import { useMapState } from '../../MapProvider';
import { Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { IoMdStarOutline } from "react-icons/io";
import MailListDateComponent from '../MailListDateComponent/MailListDateComponent';
import { colors } from '../../styles/commonStyles';
const styles = {
    mailDetailsContainer: {
        background: colors.mailListBackground
    },
    mailDetailsRow: {
        padding: '10px'
    }
}

const StyledMailDetails = styled.div`
    flex-grow: 1;

`
const StyledNames = styled.div`
`

const StyledNameLabels = styled.label`
    color: gray;
    padding-right: 10px;
`
const MailDetails: React.FC = () => {
    const { mapState: { selectedMailIdDisplay, idToMailMap, selectedAccount },
    } = useMapState();
    const selectedMail = selectedMailIdDisplay ? idToMailMap[selectedMailIdDisplay] : undefined;
    return (<Container fluid style={styles.mailDetailsContainer}>
        <Row style={styles.mailDetailsRow}>
            <StyledMailDetails>
                <StyledNames><StyledNameLabels>From:</StyledNameLabels>{selectedMail?.senderName}</StyledNames>
                <StyledNames><StyledNameLabels>To:</StyledNameLabels>{selectedAccount?.name}</StyledNames>

            </StyledMailDetails>
            {selectedMail && <MailListDateComponent dateStamp={selectedMail.date} showAgo={true} />}
            <IoMdStarOutline size={20}/>
        </Row>
    </Container>);
}

export default MailDetails;