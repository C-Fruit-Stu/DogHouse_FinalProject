import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#">Dog Trainer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#"><Link to="/" className="nav-link">Home</Link></Nav.Link>
            <Nav.Link href="#"><Link to="/about" className="nav-link">About</Link></Nav.Link>
            <Nav.Link href="#"><Link to="/services" className="nav-link">Services</Link></Nav.Link>
            <Nav.Link href="#"><Link to="/contact" className="nav-link">Contact</Link></Nav.Link>
          </Nav>
          <Nav className="ml-auto auth-links">
            <Nav.Link href="#"><Link to="/signin" className="nav-link">Sign In</Link></Nav.Link>
            <Nav.Link href="#" className="sign-up-btn"><Link to="/signup" className="nav-link">Sign Up</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

