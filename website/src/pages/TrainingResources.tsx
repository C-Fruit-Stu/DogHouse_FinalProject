import React from 'react';
import '../index.css';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const TrainingResources: React.FC = () => {
  return (
    <><>
    <Navigation/>
    </><div className="resources-container">
        <div className="resources-wrapper">
          <h1 className="resources-title">Training Resources for Dog Trainers</h1>
          <p className="resources-intro">
            Discover a curated selection of resources to enhance your dog training skills. Whether you're looking for insightful articles, instructional videos, recommended books, or useful tools, we’ve got you covered.
          </p>

          <section className="resources-section">
            <h2 className="resources-section-title">Articles</h2>
            <ul className="resources-list">
              <li className="resource-item">
                <a href="https://example.com/article1" target="_blank" rel="noopener noreferrer">
                  Understanding Canine Behavior: A Comprehensive Guide
                </a>
              </li>
              <li className="resource-item">
                <a href="https://example.com/article2" target="_blank" rel="noopener noreferrer">
                  Effective Techniques for Positive Reinforcement Training
                </a>
              </li>
              <li className="resource-item">
                <a href="https://example.com/article3" target="_blank" rel="noopener noreferrer">
                  Common Training Mistakes and How to Avoid Them
                </a>
              </li>
            </ul>
          </section>

          <section className="resources-section">
            <h2 className="resources-section-title">Videos</h2>
            <ul className="resources-list">
              <li className="resource-item">
                <a href="https://youtube.com/video1" target="_blank" rel="noopener noreferrer">
                  Introduction to Clicker Training
                </a>
              </li>
              <li className="resource-item">
                <a href="https://youtube.com/video2" target="_blank" rel="noopener noreferrer">
                  Advanced Obedience Training Techniques
                </a>
              </li>
              <li className="resource-item">
                <a href="https://youtube.com/video3" target="_blank" rel="noopener noreferrer">
                  Solving Common Behavioral Issues in Dogs
                </a>
              </li>
            </ul>
          </section>

          <section className="resources-section">
            <h2 className="resources-section-title">Books</h2>
            <ul className="resources-list">
              <li className="resource-item">
                <a href="https://example.com/book1" target="_blank" rel="noopener noreferrer">
                  "The Dog Trainer's Handbook" by John Doe
                </a>
              </li>
              <li className="resource-item">
                <a href="https://example.com/book2" target="_blank" rel="noopener noreferrer">
                  "Positive Dog Training" by Jane Smith
                </a>
              </li>
              <li className="resource-item">
                <a href="https://example.com/book3" target="_blank" rel="noopener noreferrer">
                  "Canine Behavior: Insights and Solutions" by Emily Brown
                </a>
              </li>
            </ul>
          </section>

          <section className="resources-section">
            <h2 className="resources-section-title">Tools</h2>
            <ul className="resources-list">
              <li className="resource-item">
                <a href="https://example.com/tool1" target="_blank" rel="noopener noreferrer">
                  Dog Training Clicker
                </a>
              </li>
              <li className="resource-item">
                <a href="https://example.com/tool2" target="_blank" rel="noopener noreferrer">
                  Interactive Training Toys
                </a>
              </li>
              <li className="resource-item">
                <a href="https://example.com/tool3" target="_blank" rel="noopener noreferrer">
                  Training Leashes and Harnesses
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <Footer/>
      </>
  );
};

export default TrainingResources;
