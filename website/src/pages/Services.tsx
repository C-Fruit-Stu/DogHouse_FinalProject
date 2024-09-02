import React from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/footer'
import { Container, Row, Col, Card } from 'react-bootstrap'

function Services() {
  return (
    <>
      <Navigation/>
      <div className="services">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h1 className="services-title">Our Services</h1>
            <p className="services-subtitle">
              Powerful Tools to Elevate Your Dog Training Business
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card className="services-card">
              <Card.Body>
                <div className="icon">
                  <i className="fas fa-calendar-alt"></i>
                </div>
                <h2 className="services-heading">Scheduling & Appointments</h2>
                <p className="services-text">
                  Manage your appointments effortlessly with our integrated scheduling tools. Book, reschedule, and track all your client sessions in one place.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="services-card">
              <Card.Body>
                <div className="icon">
                  <i className="fas fa-users"></i>
                </div>
                <h2 className="services-heading">Client Management</h2>
                <p className="services-text">
                  Keep all your client information organized and accessible. Track progress, manage client profiles, and enhance communication with ease.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="services-card">
              <Card.Body>
                <div className="icon">
                  <i className="fas fa-file-invoice-dollar"></i>
                </div>
                <h2 className="services-heading">Billing & Invoicing</h2>
                <p className="services-text">
                  Simplify your billing process with automated invoicing and secure payment options. Focus on training, while we handle the rest.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={4}>
            <Card className="services-card">
              <Card.Body>
                <div className="icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h2 className="services-heading">Analytics & Reports</h2>
                <p className="services-text">
                  Gain valuable insights into your business performance with our comprehensive analytics and reporting tools.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="services-card">
              <Card.Body>
                <div className="icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <h2 className="services-heading">Automated Reminders</h2>
                <p className="services-text">
                  Reduce no-shows with automated reminders sent via email or SMS. Keep your clients informed and engaged.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="services-card">
              <Card.Body>
                <div className="icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <h2 className="services-heading">Mobile Access</h2>
                <p className="services-text">
                  Access all your tools and client information on the go with our mobile-friendly platform. Manage your business anytime, anywhere.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
      <Footer/>
    </>
  )
}

export default Services