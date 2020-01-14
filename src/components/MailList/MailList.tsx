import React from 'react';
import { useMapState } from "../../MapProvider";
import { ListGroup } from 'react-bootstrap';
import { MapState } from '../../MapState';
import { getMailList } from '../../utils/getMailFolderKey';
import styled from 'styled-components';
import MailListItem from '../MailListItem/MailListItem';
const MailList: React.FC = () => {

    const {
        mapState: { selectedFolder, isLoading }
    } = useMapState();

    const StyledNoMail = styled.div`
        font-size:12px;
        font-weight: bold;
        text-align: center;
        padding: 10px;
    `

    const useSelectedFolderIds = (folderKey: keyof MapState ) => {
        const { mapState } = useMapState();
        return mapState[folderKey];
    }
    
    const folderMailIds = (useSelectedFolderIds(getMailList(selectedFolder))as string[])||[]
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (folderMailIds.length === 0) {
        return <StyledNoMail> No mails in {selectedFolder} folder</StyledNoMail>
    }
    return (<ListGroup>
        {folderMailIds.map((mailId: string) => {
            return <MailListItem key={mailId} mailId={mailId} />
        })}
    </ListGroup>)
}

export default MailList;