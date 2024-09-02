import React from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/footer'

function Contact() {
  return (
    <>
      <Navigation/>
      <div className="contact-us">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">
            We would love to hear from you! Fill out the form below or reach out to us directly.
          </p>
        </div>
        <div className="form-container">
          <div className="form-left">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" required />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Enter your message" required></textarea>
              </div>
              <button type="submit" className="contact-button mt-4">
                Send Message
              </button>
            </form>
          </div>
          <div className="form-right">
            <div className="contact-info">
              <h3 className="contact-info-title">Get in Touch</h3>
              <p className="contact-info-text">
                <i className="fas fa-map-marker-alt"></i> 123 Dog Trainer Lane, Woof City, PA 12345
              </p>
              <p className="contact-info-text">
                <i className="fas fa-phone"></i> (123) 456-7890
              </p>
              <p className="contact-info-text">
                <i className="fas fa-envelope"></i> contact@dogtrainercrm.com
              </p>
            </div>
            <div className="map-container mt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345096815!2d144.95373531550486!3d-37.817209742021105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1a82491%3A0xb2bbf1f5a2b5f88d!2sVictoria!5e0!3m2!1sen!2sau!4v1614235740487!5m2!1sen!2sau"
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
                title="Google Map"
                className="contact-map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
      <Footer/>
    </>
  )
}

export default Contact