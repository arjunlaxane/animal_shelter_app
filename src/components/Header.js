import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import logo from '../image/image-1.jpg';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faInstagram,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

const Header = () => {
  return (
    <>
      <Navbar key="md" expand="md" className="mb-3 nav-color">
        <Container fluid>
          <Navbar.Brand className="title_Nav">
            <img id="logo" src={logo} alt="Animal_Shelter_logo" />
            <span id="logo_title">ANIMAL SHELTER</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="canva-body">
              <Nav className="justify-content-end pe-3 btn-links">
                <Link to="#action1">Home</Link>
                <Link to="#action2">Contact Us</Link>
              </Nav>
              <Nav className="justify-content-end pe-3  connect">
                <Link to="#action1">
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <Link to="/">
                  <FontAwesomeIcon icon={faTwitter} />
                </Link>
                <Link to="#action1">
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
