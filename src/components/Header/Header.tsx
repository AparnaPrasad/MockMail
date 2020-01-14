import React from 'react'; 
import {useMapState} from '../../MapProvider';
import {  Navbar, Nav, Form, FormControl, Dropdown } from 'react-bootstrap';
import { ActionTypes } from '../../MapActions';
import { MdPerson } from "react-icons/md";
import { colors } from '../../styles/commonStyles';

const styles = {
    dropDownStyle: {
        background: 'transparent',
        border: 'none',
        color: 'white'
    },
    dropDownMenu: {
        marginLeft: 'auto',
        right: 0
    },
    dropDownMenuItem: {
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    navbarStyle: {
        background: colors.navBarBackground
    },
    searchBoxStyle: {
        borderRadius: '20px'
    }
}

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
    return <Navbar expand="lg" style={styles.navbarStyle}>
        <Nav>
            <Form inline>
                <FormControl style={styles.searchBoxStyle} type="text" placeholder="Search" className="mr-sm-12" />
            </Form>
        </Nav>
        <Nav className="ml-auto">
            <Dropdown onSelect={(eventKey: string) => { setMapState({ type: ActionTypes.SET_SELECTED_ACCOUNT, selectedAccountMailId: eventKey }) }}>
                <Dropdown.Toggle id={'accountDropDown'} style={styles.dropDownStyle}>
                    <div><MdPerson /></div>
                     { getDropDownSeletedTitle() }
                </Dropdown.Toggle>
                <Dropdown.Menu style={styles.dropDownMenu}>
                    {accountList.map((account, index) => (<Dropdown.Item active={account.address === selectedAccount?.address} style={styles.dropDownMenuItem} eventKey={account.address} key={account.address}>
                        {account.name}
                    </Dropdown.Item>))}

                </Dropdown.Menu>
            </Dropdown>
        </Nav>
</Navbar>
}

export default Header;