import * as React from 'react';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'react-bootstrap';
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
                    className="flex-column"
                >
                    <Container>
                        <Navbar.Brand  as={Link}  to={"/home"}>AxsisDemoProject</Navbar.Brand>
                            <NavItem>
                                <Nav.Link as={Link} to="/" className="text-dark" >Home</Nav.Link>
                            </NavItem>
                            <NavItem>
                                <Nav.Link as={Link}  to="/counter" className="text-dark">Users</Nav.Link>
                            </NavItem>
                            <NavItem>
                                <Nav.Link as={Link}  to="/fetch-data" className="text-dark">Info</Nav.Link>
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
