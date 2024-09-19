import React, { useState } from 'react';
import '../index.css';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const FAQs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What is a CRM system for dog trainers?',
      answer: 'A CRM (Customer Relationship Management) system for dog trainers is a software solution that helps manage client interactions, appointments, training schedules, and more, all in one place.'
    },
    {
      question: 'How can I schedule a training session?',
      answer: 'You can schedule a training session through the CRM system by logging in, navigating to the scheduling section, and selecting a time slot that suits you and your trainer.'
    },
    {
      question: 'Can I manage multiple dogs for one client?',
      answer: 'Yes, our CRM system allows you to manage multiple dogs for a single client, including tracking their training progress and specific needs.'
    },
    {
      question: 'What payment methods are supported?',
      answer: 'Our CRM system supports various payment methods including credit/debit cards and online payment systems. You can set up your preferred payment method in the billing section.'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Yes, we offer a mobile app that allows you to manage your appointments, client details, and training schedules on the go.'
    }
  ];

  return (
    <><></>
    <Navigation/>
    <div className="faqs-container">
          <div className="faqs-wrapper">
              <h1 className="faqs-title">Frequently Asked Questions</h1>
              <div className="accordion">
                  {faqs.map((faq, index) => (
                      <div key={index} className="accordion-item">
                          <button
                              className="accordion-header"
                              onClick={() => toggleAccordion(index)}
                          >
                              {faq.question}
                              <span className={`accordion-icon ${activeIndex === index ? 'open' : ''}`}>+</span>
                          </button>
                          <div
                              className={`accordion-body ${activeIndex === index ? 'show' : ''}`}
                          >
                              <p>{faq.answer}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
      <Footer/>
      </>
  );
};

export default FAQs;
