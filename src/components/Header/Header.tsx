import React from 'react'; 
import {useMapState} from '../../MapProvider';
import {  Navbar, Nav, Form, FormControl, Dropdown, DropdownButton, } from 'react-bootstrap';
import { ActionTypes } from '../../MapActions';

const Header: React.FC = () => {
    const {
        mapState: { accountList, selectedAccount, error },
        setMapState
        } = useMapState();
    const getDropDownSeletedTitle = () => {
        if (error || !selectedAccount?.name) {
            return "No Accounts";
        }
        return selectedAccount.name 
    }
    return <Navbar bg="light" expand="lg">
        <Nav className="mr-auto">
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            </Form>
        </Nav>
        <Nav className="ml-auto">
            <DropdownButton id={'accountDropDown'} onSelect={(eventKey: string) => { setMapState({ type: ActionTypes.SET_SELECTED_ACCOUNT, selectedAccountMailId: eventKey }) }} title={getDropDownSeletedTitle()} className="nav-item--dropdown-custom">
                {accountList.map((account, index) => (<Dropdown.Item eventKey={account.address} key={account.address}>{account.name}</Dropdown.Item>))}
            </DropdownButton>
        </Nav>
</Navbar>
}

export default Header;