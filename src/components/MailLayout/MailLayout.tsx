import { Container, Row } from 'react-bootstrap';
import './MailLayout.scss';
import React from 'react';

interface Props{
    children: React.ReactNode[]
}

const styles = {
    heightRemaining: {
        flex: 1
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
        <Container fluid className='mailCotainer'>
            <Row>{getChild(0)}</Row>
            <Row style={styles.heightRemaining}>
                {getChild(1)}
            </Row>
        </Container>
    )
}

export default MailLayout;