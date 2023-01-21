import * as React from 'react';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        return (
            <header>
                <Nav
                    
                    vertical
                >
                    <Container>
                        <NavbarBrand tag={Link} to="/">AxsisDemoProject</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/counter">Users</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/fetch-data">Info</NavLink>
                            </NavItem>
                    </Container>
                </Nav>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
