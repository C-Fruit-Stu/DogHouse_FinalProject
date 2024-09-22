import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TrainerType } from '../types/TrainerType';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { TrainerContext } from '../context/TrainerContextProvidor';
import '../index.css';



const SignUp: React.FC = () => {
  const { currentTrainer, setCurrentTrainer, RegisterNewTrainer } = useContext(TrainerContext);
  const [isLoading, setIsLoading] = useState(false);
  const [galleryImg, setGalleryImg] = useState<string[]>([]);


  const initialValues: Partial<TrainerType> = {
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
    payment: {
      card: '',
      date: '',
      cvv: ''
    },
    stayLogIn: false,
  };

  const validate = (values: Partial<TrainerType>) => {
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

    if (!values.payment || !values.payment.card) {
      errors.payment = { ...errors.payment, card: 'Card number is required', date: errors.payment?.date ? errors.payment.date : '', cvv: errors.payment?.cvv ? errors.payment.cvv : '' };
    } else if (!/^\d{16}$/.test(values.payment.card)) {
      errors.payment = { ...errors.payment, card: 'Card number must be 16 digits', date: errors.payment?.date ? errors.payment.date : '', cvv: errors.payment?.cvv ? errors.payment.cvv : '' };
    }

    if (!values.payment || !values.payment.date) {
      errors.payment = { ...errors.payment, date: 'Expiration date is required', cvv: errors.payment?.cvv ? errors.payment.cvv : '', card: errors.payment?.card ? errors.payment.card : '' };
    } else if (!/^\d{2}\/\d{2}$/.test(values.payment.date)) {
      errors.payment = { ...errors.payment, date: 'Date must be in MM/YY format', cvv: errors.payment?.cvv ? errors.payment.cvv : '', card: errors.payment?.card ? errors.payment.card : '' };
    }

    if (!values.payment || !values.payment?.cvv) {
      errors.payment = { ...errors.payment, cvv: 'cvv is required', date: errors.payment?.date ? errors.payment?.date : '', card: errors.payment?.card ? errors.payment.card : '' };
    } else if (!/^\d{3,4}$/.test(values.payment.cvv)) {
      errors.payment = { ...errors.payment, cvv: 'cvv must be 3 or 4 digits', date: errors.payment?.date ? errors.payment?.date : '', card: errors.payment?.card ? errors.payment.card : '' };
    }

    return errors;
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setGalleryImg([...galleryImg, imageUrl]);
        setFieldValue('image', imageUrl); // Save base64 image URL to Formik's field
      };
      reader.readAsDataURL(file); // Convert image to base64 URL
    }
  };
  

  const handleSubmit = async (values: Partial<TrainerType>) => {

    const NewUser: any = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      dob: values.dob,
      location: values.location,
      experience: values.experience,
      image: values.image,
      phone: values.phone,
      clientType: "1",
      payment: values.payment,
      stayLogIn: false,
      trainingSchedule: [
        {
          name: '',
          date: new Date(),
          time: ''
        }
      ],
      Posts: [
        {
          title: '',
          description: '',
          image: ''
        }
      ],
      CostumersArr: [],
    };
    console.log(NewUser.image)
    if (NewUser.email !== '') {
      setCurrentTrainer(NewUser);
      console.log('Trainer1:', currentTrainer);
      console.log('Trainer2:', NewUser);
      setIsLoading(true);
      await RegisterNewTrainer({ ...NewUser });
    }
    console.log(NewUser.image)
    window.location.href = '/signin';

  };

  return (
    <>
      <Navigation />
      <div className="signup">
        <div className="container">
          <h1 className="signup-title">Sign Up</h1>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({setFieldValue}) => (
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
                  <label htmlFor="image">Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleImageChange(event, setFieldValue)}
                  />
                  <ErrorMessage name="image" component="div" className="error-message" />
                </div>

                {/* Display the selected images */}
                {galleryImg.length > 0 && (
                  <div className="gallery mt-3">
                    {galleryImg.map((imgUri, index) => (
                      <img key={index} src={imgUri} alt="Selected" className="gallery-img" />
                    ))}
                  </div>
                )}

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

                <div className="form-group mt-3">
                  <label htmlFor="payment.card">Card Number</label>
                  <Field
                    type="text"
                    id="payment.card"
                    name="payment.card"
                    placeholder="1234 5678 9012 3456"
                    className="form-control"
                  />
                  <ErrorMessage name="payment.card" component="div" className="error-message" />
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="payment.date">Expiration Date</label>
                  <Field
                    type="text"
                    id="payment.date"
                    name="payment.date"
                    placeholder="MM/YY"
                    className="form-control"
                  />
                  <ErrorMessage name="payment.date" component="div" className="error-message" />
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="payment.cvv">cvv</label>
                  <Field
                    type="text"
                    id="payment.cvv"
                    name="payment.cvv"
                    placeholder="123"
                    className="form-control"
                  />
                  <ErrorMessage name="payment.cvv" component="div" className="error-message" />
                </div>


                <button type="submit" className="signup-button mt-4">
                  Sign Up
                </button>
              </Form>
            )}
          </Formik>
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SignUp;


function setFieldValue(arg0: string, imageUri: string) {
  throw new Error('Function not implemented.');
}

