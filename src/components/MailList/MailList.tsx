import React from 'react';
import { useMapState } from "../../MapProvider";

const MailList: React.FC = () => {
    const { 
        mapState: { userToMailMap },
        setMapState
        } = useMapState();
    console.log("user to map mail", userToMailMap);
    return (<div>Mail lidffddfst</div>)
}

export default MailList;