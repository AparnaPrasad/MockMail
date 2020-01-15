import { Container, Row } from 'react-bootstrap';
import React from 'react';
import { colors } from '../../styles/commonStyles';

interface Props{
    children: React.ReactNode[]
}

const borderStyle = `1px solid ${colors.borderColor}`
const styles = {
    heightRemaining: {
        flex: 1,
        minHeight: 0
    },
    borderMargin: {
        margin: '15px 0px'
    },
    containerBorder: {
        border: borderStyle
    },
    containerStyle: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        height: '100%',
    },
    borderBottom: {
        borderBottom: borderStyle
    }
    
}

export function  MailLayout({children}: Props){
    const getChild = (index: number) => {
        if(children && children[index]){
            return children[index]
        }
        
        return  null;
    }

    return (
        <Container fluid className='mailCotainer' style={{ ...styles.containerBorder, ...styles.containerStyle } } >
            <Row style={styles.borderBottom}>{getChild(0)}</Row>
            <Row style={{ ...styles.heightRemaining, ...styles.borderMargin }}>
                {getChild(1)}
            </Row>
        </Container>
    )
}

export default MailLayout;