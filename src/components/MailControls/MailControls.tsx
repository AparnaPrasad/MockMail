import React from 'react';
import { Form, Button, Container, Row, ButtonGroup } from 'react-bootstrap';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegEyeSlash } from 'react-icons/fa';
import { TiCancel } from "react-icons/ti";
import { useMapState } from '../../MapProvider';
import { ActionTypes } from '../../MapActions';
import { MapState } from '../../MapState';
import { getMailList } from '../../utils/getMailFolderKey';
import axios from 'axios';
import { baseUrl, HttpStatusCodes, ErrorTypes, FolderTypes } from '../../constants';

const styles = {
    rowStyles: {
        padding: '10px',
        paddingLeft: '21px'
    },
    buttonGroupStyle: {
        paddingLeft: '10px'
    }

}
const MailControls: React.FC = () => {
    const {
        mapState: { selectedFolder, idsToDelete },
        setMapState } = useMapState();

    const useSelectedFolderIds = (folderKey: keyof MapState) => {
        const { mapState } = useMapState();
        return mapState[folderKey];
    }
    const folderMailIds: string[] = (useSelectedFolderIds(getMailList(selectedFolder)) as string[])|| [];

    const selectedAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setMapState({
            type: ActionTypes.CHECK_BOX_CHANGE_ALL,
            deleteMailIds: e.target.checked ? folderMailIds: []
        })
    }

    const deleteSelected = async () => {
        try {
            const result = await axios.delete(`${baseUrl}/deleteMail`, { data: { delete: idsToDelete } })
            if (result.status !== HttpStatusCodes.Success) {
                setMapState({
                    type: ActionTypes.SET_ERROR,
                    error: ErrorTypes.ERR_DELETE_ERR
                })
                return;
            }
            const deleteIds = idsToDelete;
            deleteIds.map((mailId) => (
                setMapState({
                    type: ActionTypes.DELETE_SELECTED,
                    mailId: mailId
                })
            ))
            setMapState({
                type: ActionTypes.CLEAR_ID_DELETE
            })
        }
        catch (e) {
            setMapState({
                type: ActionTypes.SET_ERROR,
                error: ErrorTypes.ERR_DELETE_ERR
            })
        }
        
    }
    return <Container fluid >
        <Row style={styles.rowStyles}>
            <Form.Check type="checkbox"
                checked={folderMailIds.length === idsToDelete.length && folderMailIds.length!==0}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    selectedAllChange(e)
                }} />
            <ButtonGroup style={styles.buttonGroupStyle}>
                <Button variant="outline-secondary"><FaRegEyeSlash /></Button>
                <Button id="delete-button" disabled={selectedFolder === FolderTypes.T_TRASH} variant="outline-secondary" onClick={() => { deleteSelected() }}><AiOutlineDelete /></Button>
                <Button variant="outline-secondary"><TiCancel /></Button>
            </ButtonGroup>
        </Row>
        </Container>
}
export default MailControls;