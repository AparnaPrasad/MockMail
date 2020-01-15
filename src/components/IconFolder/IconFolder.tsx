import { FolderTypes } from "../../constants";
import React from "react";
import { MdMoveToInbox, MdDrafts } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { TiCancel } from "react-icons/ti";
import { AiOutlineDelete } from 'react-icons/ai';
import styled from 'styled-components';

interface Props {
    folder: FolderTypes
}

const StyledIconContainer = styled.span`
    padding: 10px
`;

const IconFolder = ({ folder }: Props) => {
    const iconProps = {
        size: 30
    }
    const folderIcon = () => {
        switch (folder) {
            case FolderTypes.T_INBOX:
                return <MdMoveToInbox { ...iconProps } />
            case FolderTypes.T_DRAFTS:
                return <MdDrafts {...iconProps} />
            case FolderTypes.T_SENT:
                return <FiSend {...iconProps} />
            case FolderTypes.T_SPAM:
                return <TiCancel {...iconProps} />
            case FolderTypes.T_TRASH:
                return <AiOutlineDelete {...iconProps} />
            default:
                return <MdMoveToInbox {...iconProps} />
        }
    }
   
    return <StyledIconContainer>{folderIcon()}</StyledIconContainer>
}

export default IconFolder;