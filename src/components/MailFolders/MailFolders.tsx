import React from 'react';
import { FolderTypes, FolderList } from '../../constants';
import { Button } from 'react-bootstrap';
import { useMapState } from '../../MapProvider';
import { ActionTypes } from '../../MapActions';
const styles = {
    listElement:{
        listStyle: 'none'
    },
    selected: {
        background: 'red'
    }
}



const MailFolders: React.FC = () => {
    const { mapState: { selectedFolder },
        setMapState } = useMapState();
    const selectFolder = (prevSelectedFolder: FolderTypes, newFolder: FolderTypes) => {
        if (prevSelectedFolder !== newFolder) {
            setMapState({ type: ActionTypes.SET_SELECTED_FOLDER, selectedFolder: newFolder })
        }
    }
    const getStyle = (selectedFolder: FolderTypes, folder: FolderTypes) => {
        return selectedFolder === folder ? { ...styles.listElement, ...styles.selected } : { ...styles.listElement }
    }
    return (<React.Fragment>
        <div>Mail</div> 
        <Button>Compose</Button>
          <ul>
            {FolderList.map((folder) => (<li key={folder}
                style={getStyle(selectedFolder, folder)}
                onClick={() => { selectFolder(selectedFolder, folder) }}>{folder}</li>))}
          </ul>
    </React.Fragment> );
}

export default MailFolders;
