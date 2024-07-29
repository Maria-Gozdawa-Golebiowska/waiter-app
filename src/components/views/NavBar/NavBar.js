import React from 'react';
import { Container, Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <section>
            <Navbar bg='primary' variant='dark' expand='lg' className='mt-4 mb-4 rounded'>
                <Container>
                    <NavbarBrand as={NavLink} to="/" exact="true">Waiter.app</NavbarBrand>
                    <Nav className='d-flex justify-content-end'>
                        <Nav.Link as={NavLink} to='/' exact="true">Home</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </section>
    );
}

export default NavBar;
