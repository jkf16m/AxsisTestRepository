import * as React from 'react';
import { Button, Collapse, Container, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../hooks/auth/authProvider';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Modal from '../../reusable/PopUp';
import './NavMenu.css';

const NavMenu =()=>{
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = React.useState(false);
    const dispatch = useAppDispatch();

        return (
            <header>
                <Navbar
                    bg="light"
                    expand="lg"
                >
                    <Container>
                        <Navbar.Brand  as={Link}  to={"/home"}>AxsisDemoProject</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-var">
                            <Nav className='me-auto'>
                                <Nav.Link as={Link} to="/" className="text-dark" >Home</Nav.Link>
                                <Nav.Link as={Link}  to="/users" className="text-dark">Users</Nav.Link>
                                
                            </Nav>
                            <Nav>
                                <Button variant="link" onClick={
                                    ()=>{setIsConfirmationModalOpen(true)}
                                } className="text-dark">Log Out</Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                {isConfirmationModalOpen &&
                <Modal
                    size="lg"
                    title='Do you want to log out?'
                    body='You will be redirected to the login page'
                    onAccept={()=>{
                        setIsConfirmationModalOpen(false)
                        logout();
                    }}
                    onClose={()=>{
                        setIsConfirmationModalOpen(false)
                    }}
                    buttons={(onAccept, onClose)=>(
                        <>
                        <Button variant={'primary'} onClick={onAccept}>Log Out</Button>
                        <Button variant={'secondary'} onClick={onClose}>Cancel</Button>
                        </>
                    )}
                />}
            </header>
        );
}
export default NavMenu;