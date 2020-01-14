import React from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';
import { AiOutlineDelete } from 'react-icons/ai';
import { useMapState } from '../../MapProvider';
import { ActionTypes } from '../../MapActions';
import { MapState } from '../../MapState';
import { getMailList } from '../../utils/getMailFolderKey';
import axios from 'axios';
import { baseUrl, HttpStatusCodes, ErrorTypes, FolderTypes } from '../../constants';

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

            idsToDelete.map((mailId) => (
                setMapState({
                    type: ActionTypes.DELETE_SELECTED,
                    mailId: mailId
                })
            ))
        }
        catch (e) {
            setMapState({
                type: ActionTypes.SET_ERROR,
                error: ErrorTypes.ERR_DELETE_ERR
            })
        }
        
    }
    return <Container>
        <Row>
            <Form.Check type="checkbox"
                checked={folderMailIds.length === idsToDelete.length && folderMailIds.length!==0}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    selectedAllChange(e)
                }} />
            <Button id="delete-button" disabled={selectedFolder === FolderTypes.T_TRASH} variant="outline-secondary" onClick={() => { deleteSelected() }}><AiOutlineDelete /></Button>
        </Row>
        </Container>
}
export default MailControls;