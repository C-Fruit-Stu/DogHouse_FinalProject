import React, { useContext, useEffect } from 'react';
import '../index.css';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { TrainerContext } from '../context/TrainerContextProvidor';
import { useNavigate } from 'react-router-dom';




const Profile: React.FC = () => {
    const { currentTrainer,setCurrentTrainer } = useContext(TrainerContext);
    const navigate = useNavigate();
    useEffect(() => {
        const timeout = setTimeout(() => {
            const trainer = sessionStorage.getItem('trainer');
            if (trainer) {
                setCurrentTrainer(JSON.parse(trainer as any));
                console.log('Current Trainer:', JSON.parse(trainer as any));
            }
        }, 3000); // 3000 milliseconds = 3 seconds
    
        return () => clearTimeout(timeout); 
    }  , [currentTrainer]);
    function handleAddPost(): void {
        navigate('/addpost');
    }

  return (
    <><>
    <Navigation/>
      </>    <div className="profile-container">
      <div className="profile-header">
        <img src={currentTrainer?.image} alt="Profile" className="profile-image" />
        <h1 className="profile-name">
          {currentTrainer?.first_name} {currentTrainer?.last_name}
        </h1>
        <p className="profile-role">Professional Dog Trainer</p>
      </div>

      <div className="profile-info">
        <h2>Customer Schedules</h2>
        <ul className="schedule-list">
          <li>Monday: Training with Alex - 10:00 AM</li>
          <li>Wednesday: Training with Max - 2:00 PM</li>
          <li>Friday: Training with Bella - 4:00 PM</li>
        </ul>

        <h2>Posts</h2>
        <div className="posts-header">
          <div className="posts-list">
            <div className="post-item">
              <img src="/path-to-post-image1.jpg" alt="Post 1" className="post-image" />
              <p>Training Tips for German Shepherds</p>
            </div>
            <div className="post-item">
              <img src="/path-to-post-image2.jpg" alt="Post 2" className="post-image" />
              <p>How to Handle Aggressive Dogs</p>
            </div>
            <div className="post-item">
              <img src="/path-to-post-image3.jpg" alt="Post 3" className="post-image" />
              <p>Benefits of Consistent Training</p>
            </div>
          </div>

          {/* Add Post Button */}
          <button className="add-post-button" onClick={handleAddPost}>
            Add Post
          </button>
        </div>

        <h2>Income and Outcome</h2>
        <div className="income-outcome">
          <div className="income">
            <h3>Income</h3>
            <p>Total: $4000</p>
          </div>
          <div className="outcome">
            <h3>Outcome</h3>
            <p>Total: $2000</p>
          </div>
        </div>
      </div>
    </div>
          <Footer/>
          </>
  );
};

export default Profile;
