import React, { useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap'
import MailFolders from '../MailFolders/MailFolders';
import MailContainer from '../MailContainer/MailContainer';
import { useMapState } from '../../MapProvider';
import axios from 'axios';
import { baseUrl } from '../../constants';
import {ActionTypes} from '../../MapActions';
import { commonStyles } from '../../styles/commonStyles';

const styles = {
  container:{
    padding: '0 15px',
    height: '100%'
  },
  rowStyle:{
    height: '100%'
  }
}

const App: React.FC = () => {
  const { 
    mapState: { featureRef },
    setMapState
    } = useMapState();
  
  useEffect(()=>{
    async function fetchMailsData(){
      try{
        const result = await axios.get(`${baseUrl}/getMails`);
        setMapState({type: ActionTypes.SET_MAILS, payload: result?.data }) 
      }
      catch(e){
        console.log(e);
      }
    }
    fetchMailsData();
  },[])

  return (
      <Container fluid style={styles.container}>
        <Row style={commonStyles.heightFull} >
          <Col style={{...commonStyles.paddingNone, ... commonStyles.borderTest }} xl={2} lg={2} md={2} sm={3} xs={3}><MailFolders/></Col>
          <Col style={{...commonStyles.paddingNone, ...commonStyles.borderTest}} xl={10} lg={10} md={10} sm={9} xs={9}><MailContainer/></Col>
        </Row>
      </Container>
    
  );
}

export default App;
