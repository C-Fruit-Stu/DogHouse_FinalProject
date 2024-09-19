import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../index.css';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Support: React.FC = () => {
  const initialValues = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  const validate = (values: typeof initialValues) => {
    const errors: Partial<typeof initialValues> = {};
    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.subject) {
      errors.subject = 'Subject is required';
    }
    if (!values.message) {
      errors.message = 'Message is required';
    }
    return errors;
  };

  const handleSubmit = (values: typeof initialValues) => {
    // Handle form submission
    console.log('Support Request Data:', values);
  };

  return (
    <><></>
    <Navigation/>
    <div className="support-container">
          <div className="support-wrapper">
              <h1 className="support-title">Support</h1>
              <p className="support-description">
                  If you have any questions or need assistance, please fill out the form below or contact us through the provided channels.
              </p>
              <Formik
                  initialValues={initialValues}
                  validate={validate}
                  onSubmit={handleSubmit}
              >
                  <Form className="support-form">
                      <div className="form-field">
                          <label htmlFor="name">Name</label>
                          <Field
                              type="text"
                              id="name"
                              name="name"
                              placeholder="Enter your name"
                              className="input-field" />
                          <ErrorMessage name="name" component="div" className="error-text" />
                      </div>
                      <div className="form-field mt-3">
                          <label htmlFor="email">Email</label>
                          <Field
                              type="email"
                              id="email"
                              name="email"
                              placeholder="Enter your email"
                              className="input-field" />
                          <ErrorMessage name="email" component="div" className="error-text" />
                      </div>
                      <div className="form-field mt-3">
                          <label htmlFor="subject">Subject</label>
                          <Field
                              type="text"
                              id="subject"
                              name="subject"
                              placeholder="Enter the subject"
                              className="input-field" />
                          <ErrorMessage name="subject" component="div" className="error-text" />
                      </div>
                      <div className="form-field mt-3">
                          <label htmlFor="message">Message</label>
                          <Field
                              as="textarea"
                              id="message"
                              name="message"
                              placeholder="Enter your message"
                              className="textarea-field" />
                          <ErrorMessage name="message" component="div" className="error-text" />
                      </div>
                      <button type="submit" className="submit-button mt-4">
                          Send Message
                      </button>
                  </Form>
              </Formik>
              <div className="contact-info mt-4">
                  <h2>Contact Us</h2>
                  <p>Email: support@example.com</p>
                  <p>Phone: (123) 456-7890</p>
                  <p>Address: 123 Dog Trainer Lane, Pet City, PC 12345</p>
              </div>
          </div>
      </div>
      <Footer/>
      </>
  );
};

export default Support;
