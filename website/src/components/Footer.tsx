import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <Container>
        <Row>
          <Col md={4} className="footer-column">
            <h5>About Us</h5>
            <p>We are passionate dog trainers committed to helping you and your dog have the best possible relationship.</p>
          </Col>
          <Col md={4} className="footer-column">
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <Link to="/"><li><a href="#">Home</a></li></Link>
              <Link to="/about"><li><a href="#">About</a></li></Link>
              <Link to="/services"><li><a href="#">Services</a></li></Link>
              <Link to="/contact"><li><a href="#">Contact Us</a></li></Link>
            </ul>
          </Col>
          <Col md={4} className="footer-column">
            <h5>Contact Us</h5>
            <p>Email: info@dogtrainer.com</p>
            <p>Phone: +123 456 7890</p>
          </Col>
        </Row>
        <Row className="footer-bottom">
          <Col className="text-center">
            <p>&copy; 2024 Dog Trainer. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
    
  //   <footer className="custom-footer">
  //   <Container>
  //     <Row>
  //       <Col md={4} className="footer-column">
  //         <h5>About Us</h5>
  //         <p>We are passionate dog trainers committed to helping you and your dog have the best possible relationship.</p>
  //       </Col>
  //       <Col md={4} className="footer-column">
  //         <h5>Quick Links</h5>
  //         <ul className="footer-links">
  //           <li><Link to="/">Home</Link></li>
  //           <li><Link to="/about">About</Link></li>
  //           <li><Link to="/services">Services</Link></li>
  //           <li><Link to="/contact">Contact Us</Link></li>
  //         </ul>
  //       </Col>
  //       <Col md={4} className="footer-column">
  //         <h5>Contact Us</h5>
  //         <p>Email: info@dogtrainer.com</p>
  //         <p>Phone: +123 456 7890</p>
  //       </Col>
  //     </Row>
  //     <Row className="footer-bottom">
  //       <Col className="text-center">
  //         <p>&copy; 2024 Dog Trainer. All rights reserved.</p>
  //       </Col>
  //     </Row>
  //   </Container>
  // </footer>
  );
};

export default Footer;
