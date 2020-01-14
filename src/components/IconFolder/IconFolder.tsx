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
    const folderIcon = () => {
        switch (folder) {
            case FolderTypes.T_INBOX:
                return <MdMoveToInbox size={25} />
            case FolderTypes.T_DRAFTS:
                return <MdDrafts size={25} />
            case FolderTypes.T_SENT:
                return <FiSend size={25} />
            case FolderTypes.T_SPAM:
                return <TiCancel size={25} />
            case FolderTypes.T_TRASH:
                return <AiOutlineDelete size={25} />
            default:
                return <MdMoveToInbox size={25} />
        }
    }
   
    return <StyledIconContainer>{folderIcon()}</StyledIconContainer>
}

export default IconFolder;