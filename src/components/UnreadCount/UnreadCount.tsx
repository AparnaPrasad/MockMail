import React from "react";
import { useMapState } from "../../MapProvider";
import styled from "styled-components";

const UnreadCount = () => {
    const {
        mapState: { userInbox, idToMailMap },
    } = useMapState();

    const SyledUnreadCount = styled.span`
        padding: 3px;
    `
    const unreadCount = userInbox?.filter((mailId) => (idToMailMap[mailId].read === false))?.length || 0;
    return unreadCount ? <SyledUnreadCount>({unreadCount})</SyledUnreadCount>: null
}

export default UnreadCount