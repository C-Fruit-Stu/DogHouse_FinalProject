import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { Link } from 'react-router-dom';

const Aside = () => {
  return (
    <aside className="aside-section">
      <Container>
        <h2 className="aside-heading">What Our Clients Say</h2>
        <Row>
          <Col md={4}>
            <Card className="aside-card">
              <Card.Body>
                <Card.Text className="aside-text">
                  "This CRM system has completely transformed the way I manage my dog training business. It's so easy to use, and the customer support is top-notch!"
                </Card.Text>
                <Card.Footer className="aside-footer">
                  <span className="client-name">- Sarah J., Professional Dog Trainer</span>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="aside-card">
              <Card.Body>
                <Card.Text className="aside-text">
                  "I love how intuitive and powerful this CRM is. It's saved me so much time and effort, and my clients love the seamless communication."
                </Card.Text>
                <Card.Footer className="aside-footer">
                  <span className="client-name">- Mike R., Dog Behaviorist</span>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="aside-card">
              <Card.Body>
                <Card.Text className="aside-text">
                  "As a busy dog trainer, I need tools that are reliable and easy to use. This CRM ticks all the boxes and has been a game-changer for my business."
                </Card.Text>
                <Card.Footer className="aside-footer">
                  <span className="client-name">- Emily K., Certified Dog Trainer</span>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <h2 className="aside-heading mt-5">Quick Links</h2>
        <Row className="mt-4">
          <Col md={12}>
            <Card className="aside-card">
              <Card.Body>
                <ul className="quick-links">
                <Link to="/trainingresources"><li><a href="#">Training Resources</a></li></Link>
                  <Link to="/support"><li><a href="#">Support</a></li></Link>
                  <Link to="/contact"><li><a href="#">Contact Us</a></li></Link>
                  <Link to="/faqs"><li><a href="#">FAQs</a></li></Link>
                  <Link to="/term"><li><a href="#">Terms & Conditions</a></li></Link>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </aside>
  );
};

export default Aside;
