import React from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/footer'
import { Container, Row, Col, Card } from 'react-bootstrap'

function About() {
  return (
    <>
        <Navigation/>

    <div className="about-us">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h1 className="about-us-title">About Us</h1>
            <p className="about-us-subtitle">
              Empowering Dog Trainers with Cutting-Edge Tools and Resources
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card className="about-us-card">
              <Card.Body>
                <h2 className="about-us-heading">Our Mission</h2>
                <p className="about-us-text">
                  Our mission is to provide professional dog trainers with an all-in-one CRM system that streamlines their business operations, enhances client communication, and allows them to focus on what they do best—training dogs.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="about-us-card">
              <Card.Body>
                <h2 className="about-us-heading">Our Values</h2>
                <p className="about-us-text">
                  We are committed to innovation, excellence, and integrity. We believe in empowering dog trainers with the tools they need to succeed, while maintaining a strong focus on customer satisfaction and ethical business practices.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h2 className="about-us-heading text-center">Meet the Team</h2>
            <Row className="mt-4">
              <Col md={4} className="text-center">
                <Card className="about-us-card">
                  <Card.Img variant="top" src="https://via.placeholder.com/150" className="team-img" />
                  <Card.Body>
                    <Card.Title className="team-name">Jane Doe</Card.Title>
                    <Card.Text className="team-role">Founder & CEO</Card.Text>
                    <Card.Text className="team-bio">
                      Jane has over 10 years of experience in the dog training industry and is passionate about helping trainers grow their businesses through innovative solutions.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="text-center">
                <Card className="about-us-card">
                  <Card.Img variant="top" src="https://via.placeholder.com/150" className="team-img" />
                  <Card.Body>
                    <Card.Title className="team-name">John Smith</Card.Title>
                    <Card.Text className="team-role">CTO</Card.Text>
                    <Card.Text className="team-bio">
                      With a background in software development and a love for dogs, John leads the technical team to create user-friendly and powerful CRM tools.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="text-center">
                <Card className="about-us-card">
                  <Card.Img variant="top" src="https://via.placeholder.com/150" className="team-img" />
                  <Card.Body>
                    <Card.Title className="team-name">Emily Clark</Card.Title>
                    <Card.Text className="team-role">Head of Customer Success</Card.Text>
                    <Card.Text className="team-bio">
                      Emily ensures that every client receives the best possible support, helping them make the most out of our CRM system to achieve their goals.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <Card className="about-us-card text-center">
              <Card.Body>
                <h2 className="about-us-heading">Our Commitment to You</h2>
                <p className="about-us-text">
                  We are dedicated to continuous improvement and innovation. Our team works tirelessly to update and enhance our CRM system, ensuring it meets the evolving needs of dog trainers everywhere.
                </p>
                <p className="about-us-text">
                  Thank you for being a part of our journey. Together, we can achieve great things in the world of dog training.
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

export default About