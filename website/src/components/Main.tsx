import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

const Main = () => {
  return (
    <section className="main-section">
      <Container>
        <h2 className="section-title">Why Choose Our CRM?</h2>
        <p className="section-subtitle">Discover the benefits of using our dog trainer CRM system to grow your business.</p>
        <Row>
          <Col md={4} className="feature-col">
            <Card className="feature-card">
              <Card.Body>
                <div className="feature-icon">
                  <i className="fas fa-dog"></i>
                </div>
                <Card.Title className="feature-title">Manage Clients</Card.Title>
                <Card.Text className="feature-text">
                  Keep track of all your clients' information in one place, from contact details to training progress.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="feature-col">
            <Card className="feature-card">
              <Card.Body>
                <div className="feature-icon">
                  <i className="fas fa-calendar-alt"></i>
                </div>
                <Card.Title className="feature-title">Schedule Sessions</Card.Title>
                <Card.Text className="feature-text">
                  Easily schedule training sessions, set reminders, and avoid double bookings with our intuitive calendar.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="feature-col">
            <Card className="feature-card">
              <Card.Body>
                <div className="feature-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <Card.Title className="feature-title">Track Progress</Card.Title>
                <Card.Text className="feature-text">
                  Monitor your clients' training progress with detailed reports and analytics to help them achieve their goals.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Main;
