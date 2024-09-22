import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { TrainerType } from '../types/TrainerType';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { TrainerContext } from '../context/TrainerContextProvidor';
import '../index.css';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const { setCurrentTrainer, RegisterNewTrainer } = useContext(TrainerContext);
  const [isLoading, setIsLoading] = useState(false);
  const [galleryImg, setGalleryImg] = useState<string[]>([]);
  const navigate = useNavigate();

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
    payment: {
      card: '',
      date: '',
      ccv: '',
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
    if (!values.payment) {
      errors.payment = { 
      card: '',
      date: '',
      ccv: '' };
    } else {
      if (!values.payment || !values.payment?.card) {
        errors.payment = { ...errors.payment, card: 'Card number is required', date: 'Expiration date is required', ccv: 'ccv is required' };
      } else if (!/^\d{16}$/.test(values.payment.card)) {
        errors.payment = { ...errors.payment, card: 'Card number must be 16 digits', date: 'Expiration date is required', ccv: 'ccv is required' };
      }

      if (!values.payment || !values.payment?.date) {
        errors.payment = { ...errors.payment, date: 'Expiration date is required', ccv: 'ccv is required', card: 'Card number is required' };
      } else if (!/^\d{2}\/\d{2}$/.test(values.payment.date)) {
        errors.payment = { ...errors.payment, date: 'Date must be in MM/YY format', ccv: 'ccv is required', card: 'Card number is required' };
      }

      if (!values.payment || !values.payment?.ccv) {
        errors.payment = { ...errors.payment, ccv: 'ccv is required', date: 'Expiration date is required', card: 'Card number is required' };
      } else if (!/^\d{3,4}$/.test(values.payment.ccv)) {
        errors.payment = { ...errors.payment, ccv: 'ccv must be 3 or 4 digits', date: 'Expiration date is required', card: 'Card number is required' };
      }
    }
    return errors;
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setGalleryImg([...galleryImg, imageUrl]);
        formik.setFieldValue('image', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values: Partial<TrainerType>) => {
      const NewUser: TrainerType = {
        first_name: values.first_name || '',
        last_name: values.last_name || '',
        email: values.email || '',
        password: values.password || '',
        dob: values.dob || '',
        location: values.location || '',
        experience: values.experience || '',
        image: values.image || '',
        phone: values.phone || '',
        clientType: '1',
        payment: values.payment || { card: '', date: '', ccv: '' },
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
            id: '',
            title: '',
            description: '',
            image: '',
            likes: 0,
            likedByUser: false,
            comments: [],
            isOwner: false,
          }
        ],
        CostumersArr: []
      };
      // { מונע מהפעולה להזין משתמש ריק }
      if (NewUser.email !== '') {
        console.log('NewUser:\n' + NewUser)
        setCurrentTrainer(NewUser);
        setIsLoading(true);
        await RegisterNewTrainer({ ...NewUser });
      }
      navigate('/signin');
    },
  });

  return (
    <>
      <Navigation />
      <div className="signup">
        <div className="container">
          <h1 className="signup-title">Sign Up</h1>
          <form onSubmit={formik.handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="Enter your first name"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.first_name}
              />
              {formik.touched.first_name && formik.errors.first_name && (
                <div className="error-message">{formik.errors.first_name}</div>
              )}
            </div>

            <div className="form-group mt-3">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Enter your last name"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.last_name}
              />
              {formik.touched.last_name && formik.errors.last_name && (
                <div className="error-message">{formik.errors.last_name}</div>
              )}
            </div>

            <div className="form-group mt-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error-message">{formik.errors.email}</div>
              )}
            </div>

            <div className="form-group mt-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error-message">{formik.errors.password}</div>
              )}
            </div>

            <div className="form-group mt-3">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dob}
              />
              {formik.touched.dob && formik.errors.dob && (
                <div className="error-message">{formik.errors.dob}</div>
              )}
            </div>

            <div className="form-group mt-3">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter your location"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.location}
              />
              {formik.touched.location && formik.errors.location && (
                <div className="error-message">{formik.errors.location}</div>
              )}
            </div>

            <div className="form-group mt-3">
              <label htmlFor="experience">Experience</label>
              <input
                type="number"
                id="experience"
                name="experience"
                placeholder="Enter your experience in years"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.experience}
              />
              {formik.touched.experience && formik.errors.experience && (
                <div className="error-message">{formik.errors.experience}</div>
              )}
            </div>

            <div className="form-group mt-3">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter your phone number (05X-XXXXXXX)"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="error-message">{formik.errors.phone}</div>
              )}
            </div>

            <div className="form-group mt-3">
              <label htmlFor="image">Profile Image</label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {formik.touched.image && formik.errors.image && (
                <div className="error-message">{formik.errors.image}</div>
              )}
            </div>
            {galleryImg.length > 0 && (
              <div className="gallery mt-3">
                {galleryImg.map((imgUri, index) => (
                  <img key={index} src={imgUri} alt="Selected" className="gallery-img" />
                ))}
              </div>
            )}

            <div className="form-group mt-3">
              <h3>Payment Information</h3>
              <div className="form-group mt-2">
                <label htmlFor="payment.card">Card Number</label>
                <input
                  type="text"
                  id="payment.card"
                  name="payment.card"
                  placeholder="Enter your card number"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.payment?.card}
                />
                {formik.touched.payment?.card && formik.errors.payment?.card && (
                  <div className="error-message">{formik.errors.payment.card}</div>
                )}
              </div>

              <div className="form-group mt-2">
                <label htmlFor="payment.date">Expiration Date (MM/YY)</label>
                <input
                  type="text"
                  id="payment.date"
                  name="payment.date"
                  placeholder="MM/YY"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.payment?.date}
                />
                {formik.touched.payment?.date && formik.errors.payment?.date && (
                  <div className="error-message">{formik.errors.payment.date}</div>
                )}
              </div>

              <div className="form-group mt-2">
                <label htmlFor="payment.ccv">CCV</label>
                <input
                  type="text"
                  id="payment.ccv"
                  name="payment.ccv"
                  placeholder="Enter your CCV"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.payment?.ccv}
                />
                {formik.touched.payment?.ccv && formik.errors.payment?.ccv && (
                  <div className="error-message">{formik.errors.payment.ccv}</div>
                )}
              </div>
            </div>

            <button type="submit" className="signup-button mt-4">
              Sign Up
            </button>
          </form>
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
