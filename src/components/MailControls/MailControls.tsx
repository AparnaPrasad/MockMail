import React from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';
import { AiOutlineDelete } from 'react-icons/ai';
import { useMapState } from '../../MapProvider';
import { ActionTypes } from '../../MapActions';
import { MapState } from '../../MapState';
import { getMailList } from '../../utils/getMailFolderKey';

const MailControls: React.FC = () => {
    const {
        mapState: { selectedFolder, idsToDelete },
        setMapState } = useMapState();

    const useSelectedFolderIds = (folderKey: keyof MapState) => {
        const { mapState } = useMapState();
        return mapState[folderKey];
    }
    const folderMailIds = useSelectedFolderIds(getMailList(selectedFolder))

    const selectedAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setMapState({
            type: ActionTypes.CHECK_BOX_CHANGE_ALL,
            deleteMailIds: e.target.checked ? folderMailIds: []
        })
    }

    const deleteSelected = () => {
        idsToDelete.map((mailId) => (
            setMapState({
                type: ActionTypes.DELETE_SELECTED,
                mailId: mailId
            })
       ))
        
    }
    return <Container>
        <Row>
            <Form.Check type="checkbox"
                checked={folderMailIds.length === idsToDelete.length && folderMailIds.length!==0}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    selectedAllChange(e)
                }} />
            <Button variant="outline-secondary" onClick={() => { deleteSelected() }}><AiOutlineDelete/></Button>
        </Row>
        </Container>
}
export default MailControls;