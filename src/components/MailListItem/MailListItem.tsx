import React from "react";
import { ListGroup, Form, Container, Row } from "react-bootstrap";
import axios from 'axios';
import { baseUrl, HttpStatusCodes, ErrorTypes } from '../../constants';
import { useMapState } from "../../MapProvider";
import { ActionTypes } from "../../MapActions";
import { IoMdStarOutline } from "react-icons/io";
import MailListDateComponent from "../MailListDateComponent/MailListDateComponent";
import styled from "styled-components";
import { colors } from "../../styles/commonStyles";
interface Props {
    mailId: string;
}
const MailSubject =  styled.div`
    flex-grow: 1
`
const StyledNameLabels = styled.div`
    color: gray;
    font-size: 13px
`

const UnreadItem = styled.div<{ read: boolean }>`
    font-weight: ${ props => props.read ? `normal`: `bold` }  
`

const styles = {
    listItemBackgroundDefault: {
        background: colors.mailListBackground
    },
    selectedMailBackground: {
        background: colors.mailSelected
    }
}

const MailListItem = ({ mailId }: Props) => {
    const {
        mapState: { idToMailMap, selectedMailIdDisplay, idsToDelete },
        setMapState
    } = useMapState();

    const itemClicked = (mailId: string, read: boolean) => {
        setMapState({ type: ActionTypes.SET_SELECTED_MAIL_DISPLAY, selectedMailToDisplay: mailId });
        if (!read) {
            markRead(mailId);
        }
    }

    const checkBoxChange = (e: React.ChangeEvent<HTMLInputElement>, mailId: string) => {
        setMapState({
            type: ActionTypes.CHECK_BOX_CHANGE,
            check: e.target.checked, id: mailId
        });
    }

    const markRead = async (mailId: string) => {
        try {
            const data = await axios.put(`${baseUrl}/markRead/${mailId}`)
            if (data.status !== HttpStatusCodes.Success) {
                setMapState({ type: ActionTypes.SET_ERROR, error: ErrorTypes.ERR_MARK_READ })
                return;
            }
            setMapState({ type: ActionTypes.SET_MAIL_READ, mailId })
        }
        catch (e) {
            setMapState({ type: ActionTypes.SET_ERROR, error: ErrorTypes.ERR_MARK_READ })
        }

    }
    const mailItem = idToMailMap[mailId];

    return <ListGroup.Item style={selectedMailIdDisplay === mailId ? styles.selectedMailBackground : styles.listItemBackgroundDefault} key={mailId} onClick={() => { itemClicked(mailId, mailItem.read) }}>
        <Container >
            <Row>
                <Form.Check type="checkbox"
                    checked={idsToDelete.indexOf(mailId) >= 0}
                    onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => { e.stopPropagation() }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { checkBoxChange(e, mailId) }}
                />
                <MailSubject>
                    <UnreadItem read={mailItem.read}>{idToMailMap[mailId].subject}</UnreadItem>
                    <StyledNameLabels>{mailItem.senderName}</StyledNameLabels>
                </MailSubject>
                <UnreadItem read={mailItem.read}><MailListDateComponent dateStamp={mailItem.date} /></UnreadItem>
                <IoMdStarOutline size={20} />
            </Row>
        </Container>
    </ListGroup.Item>
}

export default MailListItem