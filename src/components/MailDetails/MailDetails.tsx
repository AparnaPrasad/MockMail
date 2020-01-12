import React from 'react';
import { useMapState } from '../../MapProvider';

const MailDetails: React.FC = () => {
    const { mapState: { selectedMailIdDisplay, idToMailMap },
    } = useMapState();
    return (<div>
        {selectedMailIdDisplay ? idToMailMap[selectedMailIdDisplay].date : null}
    </div>);
}

export default MailDetails;