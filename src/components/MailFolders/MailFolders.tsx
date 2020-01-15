import React from 'react';
import { FolderTypes, FolderList } from '../../constants';
import { Button } from 'react-bootstrap';
import { useMapState } from '../../MapProvider';
import { ActionTypes } from '../../MapActions';
import styled from 'styled-components';
import { GoMail } from "react-icons/go";
import { colors } from "../../styles/commonStyles";
import IconFolder from '../IconFolder/IconFolder';
import UnreadCount from '../UnreadCount/UnreadCount';

const styles = {
   
    selected: {
        background: colors.mailFolderSelected
    },
    folderBox: {
        justifyContent: 'center'
    }
}

const StyledText = styled.div`
        padding: 10px 0px;
        padding-left: 40px;
        
    `;

const StyledLogo = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px;
    align-items: center;
    font-size: 20px
`
const StyledLogoItems = styled.div`
    padding: 10px,
    font-size: 24px
`
const StyledName = styled.div`
    padding: 10px;
    font-size: 23px
`
const StyledFolderListContainer = styled.div`
    margin-top: 20px
`
const StyledFolderName = styled.span`
    font-size: 18px
`
const MailFolders: React.FC = () => {
    const { mapState: { selectedFolder },
        setMapState } = useMapState();
    const selectFolder = (prevSelectedFolder: FolderTypes, newFolder: FolderTypes) => {
        if (prevSelectedFolder !== newFolder) {
            setMapState({ type: ActionTypes.SET_SELECTED_FOLDER, selectedFolder: newFolder })
        }
    }
    const getStyle = (selectedFolder: FolderTypes, folder: FolderTypes) => {
        return selectedFolder === folder ? { ...styles.selected } : {}
    }

    

    return (<React.Fragment>
        <StyledLogo>
            <StyledLogoItems><GoMail size={30} /></StyledLogoItems>
            <StyledName>Mail</StyledName>
        </StyledLogo> 
        <StyledLogo><Button>Compose</Button></StyledLogo>
        <StyledFolderListContainer>
            {FolderList.map((folder) => (<StyledText key={folder}
                style={getStyle(selectedFolder, folder)}
                onClick={() => { selectFolder(selectedFolder, folder) }}>
                <React.Fragment>
                    <IconFolder folder={folder} />
                    <StyledFolderName>{folder}</StyledFolderName>{folder === FolderTypes.T_INBOX && <UnreadCount/>}
                </React.Fragment>
            </StyledText>))}
        </StyledFolderListContainer>
    </React.Fragment>);
}

export default MailFolders;
