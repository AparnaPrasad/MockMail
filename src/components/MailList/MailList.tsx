import React from 'react';
import { useMapState } from "../../MapProvider";
import { ListGroup, Form } from 'react-bootstrap';
import { FolderTypes } from '../../constants';
import { MapState } from '../../MapState';
import { ActionTypes, T_Mail } from '../../MapActions';
import './MailList.scss';
import axios from 'axios';
import { baseUrl } from '../../constants';
import { getMailList } from '../../utils/getMailFolderKey';
const MailList: React.FC = () => {

    const {
        mapState: { idToMailMap, selectedFolder, idsToDelete },
        setMapState
    } = useMapState();

    

    const useSelectedFolderIds = (folderKey: keyof MapState ) => {
        const { mapState } = useMapState();
        return mapState[folderKey];
    }

    const markRead = async (mailId: string) => {
        try {
            const data = await axios.put(`${baseUrl}/markRead/${mailId}`)
            //console.log("data got", data);
            if (data.status === 201) {
                setMapState({ type: ActionTypes.SET_MAIL_READ, mailId })
            }
            else {
                //Error banner
            }
        }
        catch (e) {
            //Error banner
            console.log("Error setting set"+e)
        }

    }

    const itemClicked = (mailId: string, read: boolean) => {
        setMapState({ type: ActionTypes.SET_SELECTED_MAIL_DISPLAY, selectedMailToDisplay: mailId });
        if (!read) {
            markRead(mailId);
        }
    }

    const checkBoxChange = (e: React.ChangeEvent<HTMLInputElement>, mailId: string) => {
        //e.stopPropagation()
        setMapState({
            type: ActionTypes.CHECK_BOX_CHANGE,
            check: e.target.checked, id: mailId
        });
    }
    const folderMailIds = useSelectedFolderIds(getMailList(selectedFolder))
    return (<ListGroup>
        {folderMailIds.map((mailId: string) => {
            const mailItem = idToMailMap[mailId];
            return <ListGroup.Item key={mailId} onClick={() => { itemClicked(mailId, mailItem.read) }}>
                <Form.Check type="checkbox"
                    checked={idsToDelete.indexOf(mailId)>=0}
                    onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => { e.stopPropagation() }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { checkBoxChange(e, mailId) }}
                />
                <div className={mailItem.read ? '' : 'unread-style'}>{idToMailMap[mailId].subject}</div>
                <div>{mailItem.senderEmail}</div>
            </ListGroup.Item>
        })}
    </ListGroup>)
}

export default MailList;