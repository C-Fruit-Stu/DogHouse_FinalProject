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
  const [galleryImg, setGalleryImg] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  // Initial form values
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
    payment: {
      card: '',
      date: '',
      ccv: '',
    },
  };

  // Custom validation function
  const validate = (values: Partial<TrainerType>) => {
    const errors: { [key: string]: any } = {};

    // First Name Validation
    if (!values.first_name) {
      errors.first_name = 'First name is required';
    } else if (values.first_name.length < 2) {
      errors.first_name = 'First name must be at least 2 characters';
    } else if (values.first_name.length > 25) {
      errors.first_name = 'First name must be less than 25 characters';
    }

    // Last Name Validation
    if (!values.last_name) {
      errors.last_name = 'Last name is required';
    } else if (values.last_name.length < 2) {
      errors.last_name = 'Last name must be at least 2 characters';
    } else if (values.last_name.length > 25) {
      errors.last_name = 'Last name must be less than 25 characters';
    }

    // Email Validation
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }

    // Password Validation
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    // Date of Birth Validation
    if (!values.dob) {
      errors.dob = 'Date of Birth is required';
    } else {
      const today = new Date();
      const birthDate = new Date(values.dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      if (age < 18 || age > 100) {
        errors.dob = 'Age must be between 18 and 100 years';
      }
    }

    // Location Validation
    if (!values.location) {
      errors.location = 'Location is required';
    } else if (values.location.length < 2) {
      errors.location = 'Location must be at least 2 characters';
    }

    // Experience Validation
    if (!values.experience) {
      errors.experience = 'Experience is required';
    } else if (isNaN(Number(values.experience))) {
      errors.experience = 'Experience must be a number';
    }

    // Phone Number Validation
    if (!values.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^05\d-\d{7}$/.test(values.phone)) {
      errors.phone = 'Phone number must be in the format 05X-XXXXXXX';
    }

    // Payment Information Validation
    if (values.payment) {
      const paymentErrors: { [key: string]: string } = {};

      // Card Number Validation
      if (!values.payment.card) {
        paymentErrors.card = 'Card number is required';
      } else if (!/^\d{16}$/.test(values.payment.card)) {
        paymentErrors.card = 'Card number must be 16 digits';
      }

      // Expiration Date Validation
      if (!values.payment.date) {
        paymentErrors.date = 'Expiration date is required';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(values.payment.date)) {
        paymentErrors.date = 'Date must be in MM/YY format';
      }

      // CCV Validation
      if (!values.payment.ccv) {
        paymentErrors.ccv = 'CCV is required';
      } else if (!/^\d{3,4}$/.test(values.payment.ccv)) {
        paymentErrors.ccv = 'CCV must be 3 or 4 digits';
      }

      if (Object.keys(paymentErrors).length > 0) {
        errors.payment = paymentErrors;
      }
    } else {
      errors.payment = {
        card: 'Card number is required',
        date: 'Expiration date is required',
        ccv: 'CCV is required',
      };
    }

    // Image Validation
    if (!values.image) {
      errors.image = 'Profile image is required';
    }

    return errors;
  };

  // Handle image upload
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setGalleryImg([imageUrl]); // Keep only the latest image
        formik.setFieldValue('image', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // Initialize Formik
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values: Partial<TrainerType>) => {
      if (isSubmitting) return; // Prevent multiple submissions
      setIsSubmitting(true);

      // Construct the NewUser object
      const NewUser: TrainerType = {
        first_name: values.first_name || '',
        last_name: values.last_name || '',
        email: values.email || '',
        password: values.password || '',
        dob: values.dob || '',
        location: values.location || '',
        experience: values.experience?.toString() || '',
        image: galleryImg[0] || '',
        phone: values.phone || '',
        clientType: '1',
        payment: values.payment || { card: '', date: '', ccv: '' },
        stayLogIn: false,
        trainingSchedule: [
          {
            name: '',
            date: new Date(),
            time: '',
          },
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
          },
        ],
        CostumersArr: [],
      };

      // Debugging: Log the NewUser object
      console.log('NewUser:', NewUser);

      try {
        // Update the current trainer state
        setCurrentTrainer(NewUser);

        // Register the new trainer (replace with actual API call)
        await RegisterNewTrainer(NewUser);

        // Navigate to the sign-in page after successful registration
        navigate('/signin');
      } catch (error) {
        console.error('Registration failed:', error);
        // Optionally, handle registration errors (e.g., show error message to user)
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <>
      <Navigation />
      <div className="signup">
        <div className="container">
          <h1 className="signup-title">Sign Up</h1>
          <form onSubmit={formik.handleSubmit} className="signup-form">
            {/* First Name */}
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
              {formik.touched.first_name && formik.errors.first_name ? (
                <div className="error-message">{formik.errors.first_name}</div>
              ) : null}
            </div>

            {/* Last Name */}
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
              {formik.touched.last_name && formik.errors.last_name ? (
                <div className="error-message">{formik.errors.last_name}</div>
              ) : null}
            </div>

            {/* Email */}
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
              {formik.touched.email && formik.errors.email ? (
                <div className="error-message">{formik.errors.email}</div>
              ) : null}
            </div>

            {/* Password */}
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
              {formik.touched.password && formik.errors.password ? (
                <div className="error-message">{formik.errors.password}</div>
              ) : null}
            </div>

            {/* Date of Birth */}
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
              {formik.touched.dob && formik.errors.dob ? (
                <div className="error-message">{formik.errors.dob}</div>
              ) : null}
            </div>

            {/* Location */}
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
              {formik.touched.location && formik.errors.location ? (
                <div className="error-message">{formik.errors.location}</div>
              ) : null}
            </div>

            {/* Experience */}
            <div className="form-group mt-3">
              <label htmlFor="experience">Experience (Years)</label>
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
              {formik.touched.experience && formik.errors.experience ? (
                <div className="error-message">{formik.errors.experience}</div>
              ) : null}
            </div>

            {/* Phone Number */}
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
              {formik.touched.phone && formik.errors.phone ? (
                <div className="error-message">{formik.errors.phone}</div>
              ) : null}
            </div>

            {/* Profile Image */}
            <div className="form-group mt-3">
              <label htmlFor="image">Profile Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="form-control"
                onChange={handleImageChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.image && formik.errors.image ? (
                <div className="error-message">{formik.errors.image}</div>
              ) : null}
            </div>

            {/* Display Selected Image */}
            {galleryImg.length > 0 && (
              <div className="gallery mt-3">
                <img
                  src={galleryImg[0]}
                  alt="Selected"
                  className="gallery-img"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              </div>
            )}

            {/* Payment Information */}
            <div className="form-group mt-3">
              <h3>Payment Information</h3>

              {/* Card Number */}
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
                  value={formik.values.payment?.card || ''}
                />
                {formik.touched.payment?.card && formik.errors.payment?.card ? (
                  <div className="error-message">{formik.errors.payment.card}</div>
                ) : null}
              </div>

              {/* Expiration Date */}
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
                  value={formik.values.payment?.date || ''}
                />
                {formik.touched.payment?.date && formik.errors.payment?.date ? (
                  <div className="error-message">{formik.errors.payment.date}</div>
                ) : null}
              </div>

              {/* CCV */}
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
                  value={formik.values.payment?.ccv || ''}
                />
                {formik.touched.payment?.ccv && formik.errors.payment?.ccv ? (
                  <div className="error-message">{formik.errors.payment.ccv}</div>
                ) : null}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="signup-button mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Sign Up'}
            </button>
          </form>

          {/* Loading Indicator */}
          {isSubmitting && (
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
