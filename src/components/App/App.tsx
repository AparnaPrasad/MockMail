import React, { useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap'
import MailFolders from '../MailFolders/MailFolders';
import MailContainer from '../MailContainer/MailContainer';
import { useMapState } from '../../MapProvider';
import axios from 'axios';
import { baseUrl, ErrorTypes } from '../../constants';
import { ActionTypes } from '../../MapActions';
import { commonStyles, colors } from '../../styles/commonStyles';

const styles = {
  container:{
    padding: '0 15px',
    height: '100%'
  },
  rowStyle:{
    height: '100%'
    },
    sideBarContainer: {
        background: colors.sidebarBackground,
        color: "white"
    }
}

const App: React.FC = () => {
  const { 
    setMapState
    } = useMapState();
  
  useEffect(()=>{
    async function fetchMailsData(){
        try {
            setMapState({ type: ActionTypes.SET_LOADING }) 
            const result = await axios.get(`${baseUrl}/getMails`);
            setMapState({type: ActionTypes.SET_MAILS, payload: result?.data }) 
        }
      catch (e) {
          setMapState({ type: ActionTypes.SET_ERROR, error: ErrorTypes.ERR_DATA_RECEIVE_ERROR }) 
      }
    }
    fetchMailsData();
  },[])

  return (
      <Container fluid style={styles.container}>
          <Row style={commonStyles.heightFull} >
              <Col style={{ ...commonStyles.paddingNone, ...styles.sideBarContainer }} xl={2} lg={2} md={2} sm={3} xs={3}><MailFolders /></Col>
              <Col style={{...commonStyles.paddingNone}} xl={10} lg={10} md={10} sm={9} xs={9}><MailContainer/></Col>
        </Row>
      </Container>
    
  );
}

export default App;
