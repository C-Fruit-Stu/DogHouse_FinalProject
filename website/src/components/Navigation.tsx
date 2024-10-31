import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { TrainerContext } from '../context/TrainerContextProvidor';

const Navigation = () => {
  const { currentTrainer } = useContext(TrainerContext);
    useEffect(() => {
        const timeout = setTimeout(() => {
            const trainer = sessionStorage.getItem('trainer');
            if (trainer) {
                // console.log('Current Trainer:', JSON.parse(trainer as any));
            }
        }, 10); // 3000 milliseconds = 3 seconds
    
        return () => clearTimeout(timeout); 
    }  , [currentTrainer]);
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
            {
              (currentTrainer !== undefined) ? (
                <Nav.Link href="#"><Link to="/profile" className="nav-link">hello {currentTrainer.first_name}</Link></Nav.Link>
              ) : <>
                    <Nav.Link href="#"><Link to="/signin" className="nav-link">Sign In</Link></Nav.Link>
                    <Nav.Link href="#" className="sign-up-btn"><Link to="/signup" className="nav-link">Sign Up</Link></Nav.Link>
                  </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

