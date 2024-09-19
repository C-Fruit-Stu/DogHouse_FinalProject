import React from 'react';
import '../index.css';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const TermsAndConditions: React.FC = () => {
  return (
    <><>
    <Navigation/>
    </><div className="terms-container">
        <div className="terms-wrapper">
          <h1 className="terms-title">Terms and Conditions</h1>
          <p className="terms-intro">
            Welcome to [Your Company Name]! These Terms and Conditions outline the rules and regulations for the use of our website and services. By accessing or using our services, you agree to comply with these terms. If you do not agree with these terms, please do not use our services.
          </p>

          <h2 className="terms-section-title">1. Introduction</h2>
          <p className="terms-text">
            These Terms and Conditions govern your use of our website and services provided by [Your Company Name]. By using our services, you agree to be bound by these terms.
          </p>

          <h2 className="terms-section-title">2. Services</h2>
          <p className="terms-text">
            [Your Company Name] provides a CRM system designed for dog trainers. Our services include client management, scheduling, and payment processing. We reserve the right to modify or discontinue any aspect of our services at any time.
          </p>

          <h2 className="terms-section-title">3. User Responsibilities</h2>
          <p className="terms-text">
            Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
          </p>

          <h2 className="terms-section-title">4. Payment and Billing</h2>
          <p className="terms-text">
            All payments for our services are processed through secure payment gateways. You are responsible for providing accurate billing information and for timely payment of any fees associated with our services.
          </p>

          <h2 className="terms-section-title">5. Termination</h2>
          <p className="terms-text">
            We reserve the right to suspend or terminate your access to our services if we determine, at our sole discretion, that you have violated these Terms and Conditions or any applicable laws.
          </p>

          <h2 className="terms-section-title">6. Limitation of Liability</h2>
          <p className="terms-text">
            [Your Company Name] will not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use or inability to use our services. Our total liability is limited to the maximum extent permitted by law.
          </p>

          <h2 className="terms-section-title">7. Changes to Terms</h2>
          <p className="terms-text">
            We may update these Terms and Conditions from time to time. Any changes will be posted on this page with an updated revision date. Your continued use of our services following any changes constitutes your acceptance of the new terms.
          </p>

          <h2 className="terms-section-title">8. Governing Law</h2>
          <p className="terms-text">
            These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Country/State]. Any disputes arising out of or in connection with these terms will be subject to the exclusive jurisdiction of the courts located in [Your Country/State].
          </p>

          <h2 className="terms-section-title">9. Contact Us</h2>
          <p className="terms-text">
            If you have any questions or concerns about these Terms and Conditions, please contact us at:
          </p>
          <p className="terms-text">
            Email: support@example.com<br />
            Phone: (123) 456-7890<br />
            Address: 123 Dog Trainer Lane, Pet City, PC 12345
          </p>
        </div>
      </div>
      <Footer/>
      </>
  );
};

export default TermsAndConditions;
