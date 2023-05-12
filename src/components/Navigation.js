import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand className='mx-5'>Lenovo Platform</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>Página principal</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/view-users">
            <Nav.Link>Ver usuarios</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/create-user">
            <Nav.Link>Crear un usuario</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/view-mail-template">
            <Nav.Link>Plantilla de correspondencia</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/create-mails">
            <Nav.Link>Generar correspondencias</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
