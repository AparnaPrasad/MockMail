import React from 'react';
import { useMapState } from '../../MapProvider';

const MailSubject: React.FC = () => {
    const { mapState: { selectedMailIdDisplay, idToMailMap },
    } = useMapState();
    return (<div>
        {selectedMailIdDisplay ? idToMailMap[selectedMailIdDisplay].subject : null}
    </div>);
}

export default MailSubject;