import { Container, Nav, NavLink, Navbar, NavbarBrand } from "react-bootstrap"

const NavBar = () => {
    return (
        <section>
             <Navbar bg='primary' variant='dark' expand='lg' className='mt-4 mb-4 rounded'>
                <Container>
                    <NavbarBrand as={NavLink} to="/">Waiter.app</NavbarBrand>
                    <Nav className='d-flex justify-content-end'>
                        <Nav.Link as={NavLink} to='/'>Home</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </section>
    )
}
export default NavBar;