import * as React from 'react';
import { Button, Collapse, Container, Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../../../store';
import { actionCreators, TokenState } from '../../../store/TokenStore';
import Modal from '../../reusable/PopUp';
import './NavMenu.css';

const NavMenu =()=>{
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = React.useState(false);
    const tokenStore = useSelector((state: ApplicationState)=> state.token);
    const dispatch = useDispatch();

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
                                <Nav.Link as={Link}  to="/counter" className="text-dark">Users</Nav.Link>
                                <Nav.Link as={Link}  to="/fetch-data" className="text-dark">Info</Nav.Link>
                                
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
                    title='Do you want to log out?'
                    body='You will be redirected to the login page'
                    onAccept={()=>{
                        setIsConfirmationModalOpen(false)
                        dispatch(actionCreators.removeToken());
                    }}
                    onClose={()=>{
                        setIsConfirmationModalOpen(false)
                    }}
                    buttons={(onAccept, onClose)=>(
                        <>
                        <Button variant={'primary'} onClick={onAccept}>LogOut</Button>
                        <Button variant={'secondary'} onClick={onClose}>Cancel</Button>
                        </>
                    )}
                />}
            </header>
        );
}
export default NavMenu;