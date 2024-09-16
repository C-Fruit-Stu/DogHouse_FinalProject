import React, { useContext } from 'react';
import { useFormik } from 'formik';
import Navigation from '../components/Navigation';
import Footer from '../components/footer';
import { TrainerContext } from '../context/TrainerContextProvidor';

type PaymentValues = {
  card: string;
  date: string;
  ccv: string;
  name: string;
};

const PaymentPage: React.FC = () => {
  const {RegisterNewTrainer,currentTrainer} = useContext(TrainerContext);
  const formik = useFormik<PaymentValues>({
    initialValues: {
      card: '',
      date: '',
      ccv: '',
      name: '',
    },
    validate: (values) => {
      const errors: Partial<PaymentValues> = {};

      if (!values.card) {
        errors.card = 'Card number is required';
      } else if (!/^\d{16}$/.test(values.card)) {
        errors.card = 'Card number must be 16 digits';
      }

      if (!values.date) {
        errors.date = 'Expiration date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(values.date)) {
        errors.date = 'Date must be in MM/YY format';
      }

      if (!values.ccv) {
        errors.ccv = 'CCV is required';
      } else if (!/^\d{3,4}$/.test(values.ccv)) {
        errors.ccv = 'CCV must be 3 or 4 digits';
      }

      if (!values.name) {
        errors.name = 'Name on card is required';
      }

      return errors;
    },
    onSubmit: async (values) => {
      console.log('Payment details submitted:', values);

      const NewTrainer: any = {
        first_name: currentTrainer.first_name,
        last_name: currentTrainer.last_name,
        email: currentTrainer.email,
        password: currentTrainer.password,
        dob: currentTrainer.dob,
        location: currentTrainer.location,
        experience: currentTrainer.experience,
        image: currentTrainer.image,
        phone: currentTrainer.phone,
        clientType: currentTrainer.clientType,
        payment: {
          card: currentTrainer.card,
          date: currentTrainer.date,
          ccv: currentTrainer.ccv
        },
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
        ]
      }
      console.log('New Trainer: ' + NewTrainer);
      await RegisterNewTrainer(NewTrainer);
      // Handle payment submission
    },
  });

  return (
    <><>
    <Navigation/>
    </><div className="payment-container">
        <h1 className="payment-title">Payment Information</h1>
        <form onSubmit={formik.handleSubmit} className="payment-form">
          <div className="form-field">
            <label htmlFor="name">Name on Card</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="input-field"
              placeholder="John Doe" />
            {formik.errors.name && formik.touched.name && (
              <div className="error-text">{formik.errors.name}</div>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="card">Card Number</label>
            <input
              type="text"
              id="card"
              name="card"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.card}
              className="input-field"
              placeholder="1234 5678 9012 3456" />
            {formik.errors.card && formik.touched.card && (
              <div className="error-text">{formik.errors.card}</div>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="date">Expiration Date</label>
            <input
              type="text"
              id="date"
              name="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
              className="input-field"
              placeholder="MM/YY" />
            {formik.errors.date && formik.touched.date && (
              <div className="error-text">{formik.errors.date}</div>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="ccv">CCV</label>
            <input
              type="text"
              id="ccv"
              name="ccv"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ccv}
              className="input-field"
              placeholder="123" />
            {formik.errors.ccv && formik.touched.ccv && (
              <div className="error-text">{formik.errors.ccv}</div>
            )}
          </div>
          <button type="submit" className="submit-button">
            Submit Payment
          </button>
        </form>
      </div>
      <Footer/>
      </>
  );
};

export default PaymentPage;
