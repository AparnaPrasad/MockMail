import React from 'react';
import { FolderTypes, FolderList } from '../../constants';
import { Button } from 'react-bootstrap';
const styles = {
    listElement:{
        listStyle: 'none'
    }
}

const MailFolders: React.FC = () => {
  return (<React.Fragment>
    <div>Mail</div> 
    <Button>Compose</Button>
    <ul>
      {FolderList.map((folder) => (<li style={styles.listElement} >{folder}</li>))}
    </ul>
  </React.Fragment> );
}

export default MailFolders;
