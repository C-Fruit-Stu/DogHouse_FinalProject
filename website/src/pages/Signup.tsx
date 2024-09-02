import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TrainerType } from '../types/TrainerType';
import Navigation from '../components/Navigation';
import Footer from '../components/footer';



const SignUp: React.FC = () => {
  const initialValues: TrainerType = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    dob: '',
    location: '',
    experience: '',
    image: '',
    phone: '',
    clientType: '1',
  };

  const validate = (values: TrainerType) => {
    const errors: Partial<TrainerType> = {};

    if (!values.first_name) {
      errors.first_name = 'Required';
    } else if (values.first_name.length < 2) {
      errors.first_name = 'First name must be at least 2 characters';
    } else if (values.first_name.length > 25) {
      errors.first_name = 'First name must be less than 25 characters';
    }

    if (!values.last_name) {
      errors.last_name = 'Required';
    } else if (values.last_name.length < 2) {
      errors.last_name = 'Last name must be at least 2 characters';
    } else if (values.last_name.length > 25) {
      errors.last_name = 'Last name must be less than 25 characters';
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email format';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (!values.dob) {
      errors.dob = 'Required';
    } else {
      const today = new Date();
      const birthDate = new Date(values.dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18 || age > 100) {
        errors.dob = 'Age must be between 18 and 100 years';
      }
    }

    if (!values.location) {
      errors.location = 'Required';
    } else if (values.location.length < 2) {
      errors.location = 'Location must be at least 2 characters';
    }

    if (!values.experience) {
      errors.experience = 'Required';
    } else if (isNaN(Number(values.experience))) {
      errors.experience = 'Experience must be a number';
    }

    if (!values.image) {
      errors.image = 'Required';
    }

    if (!values.phone) {
      errors.phone = 'Required';
    } else if (!/^05\d-\d{7}$/.test(values.phone)) {
      errors.phone = 'Phone number must be in the format 05X-XXXXXXX';
    }

    return errors;
  };

  const handleSubmit = (values: TrainerType) => {
    console.log('Form Submitted:', values);
    window.location.href = '/signin';

  };

  return (
    <>
    <Navigation/>
    <div className="signup">
      <div className="container">
        <h1 className="signup-title">Sign Up</h1>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="signup-form">
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <Field
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="Enter your first name"
                  className="form-control" />
                <ErrorMessage name="first_name" component="div" className="error-message" />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="last_name">Last Name</label>
                <Field
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="Enter your last name"
                  className="form-control" />
                <ErrorMessage name="last_name" component="div" className="error-message" />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="form-control" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="form-control" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="dob">Date of Birth</label>
                <Field
                  type="date"
                  id="dob"
                  name="dob"
                  className="form-control" />
                <ErrorMessage name="dob" component="div" className="error-message" />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="location">Location</label>
                <Field
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter your location"
                  className="form-control" />
                <ErrorMessage name="location" component="div" className="error-message" />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="phone">Phone</label>
                <Field
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="form-control" />
                <ErrorMessage name="phone" component="div" className="error-message" />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="image">Profile Image URL</label>
                <Field
                  type="text"
                  id="image"
                  name="image"
                  placeholder="Enter your profile image URL"
                  className="form-control" />
                <ErrorMessage name="image" component="div" className="error-message" />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="experience">Experience</label>
                <Field
                  as="textarea"
                  id="experience"
                  name="experience"
                  placeholder="Experience"
                  className="form-control" />
                <ErrorMessage name="experience" component="div" className="error-message" />
              </div>

              <button type="submit" className="signup-button mt-4">
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default SignUp;
