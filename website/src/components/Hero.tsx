import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-section">
            <h1 className="hero-title">Manage Your Dog Training Business with Ease</h1>
            <p className="hero-subtitle">A complete CRM solution for dog trainers, designed to help you focus on what you love – training dogs.</p>
            <Link to="/signup" className="hero-link"><button className="hero-button">Get Started</button></Link>
          </Col>
          <Col md={6} className="image-section">
            <img src="https://plus.unsplash.com/premium_photo-1686523495702-c97ce4c09a40?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Dog Trainer CRM" className="hero-image" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
