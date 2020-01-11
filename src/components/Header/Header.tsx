import React from 'react'; 
import {useMapState} from '../../MapProvider';
import { Container, Navbar, Nav, NavDropdown, Form, FormControl, } from 'react-bootstrap';

const styles = {
    mailsDisplay:{
        flex: 1
    }
}
const Header: React.FC = () => {
    const { 
        mapState: { accountList,selectedAccount }
        } = useMapState();

    return <Navbar bg="light" expand="lg">
        <Nav className="mr-auto">
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            </Form>
        </Nav>
        <Nav className="ml-auto">
            <NavDropdown title={selectedAccount} id="basic-nav-dropdown" className="nav-item--dropdown-custom">
            {accountList.map((account, index)=>(<NavDropdown.Item key={account.address}>{account.name}</NavDropdown.Item>))}
            </NavDropdown>
        </Nav>
</Navbar>
}

export default Header;