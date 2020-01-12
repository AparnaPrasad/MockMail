import React from 'react'; 
import {useMapState} from '../../MapProvider';
import { Container, Navbar, Nav, NavDropdown, Form, FormControl, Dropdown, DropdownButton, } from 'react-bootstrap';
import { ActionTypes } from '../../MapActions';

const styles = {
    mailsDisplay:{
        flex: 1
    }
}
const Header: React.FC = () => {
    const {
        mapState: { accountList, selectedAccount, featureRef },
        setMapState
        } = useMapState();

    return <Navbar bg="light" expand="lg">
        <Nav className="mr-auto">
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            </Form>
        </Nav>
        <Nav className="ml-auto">
            <DropdownButton id={'accountDropDown'} onSelect={(eventKey: string) => { setMapState({ type: ActionTypes.SET_SELECTED_ACCOUNT, selectedAccountMailId: eventKey }) }} title={selectedAccount?.name || 'No Accouunts'} className="nav-item--dropdown-custom">
                {accountList.map((account, index) => (<Dropdown.Item eventKey={account.address} key={account.address}>{account.name}</Dropdown.Item>))}
            </DropdownButton>
        </Nav>
</Navbar>
}

export default Header;