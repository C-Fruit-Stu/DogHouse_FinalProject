import React, { useContext, useEffect, useState } from 'react';
import '../index.css';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { TrainerContext } from '../context/TrainerContextProvidor';
import { useNavigate } from 'react-router-dom';




const Profile: React.FC = () => {

    const { currentTrainer,setCurrentTrainer,openNewDate,DeleteNewDate,getuserByEmail } = useContext(TrainerContext);


    const navigate = useNavigate();
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');
    useEffect(() => {
      const storedTrainer = sessionStorage.getItem('trainer');
      if (!currentTrainer && storedTrainer) {
        try {
          const parsedTrainer = JSON.parse(storedTrainer);
          setCurrentTrainer(parsedTrainer);
          console.log('Trainer loaded from sessionStorage:', parsedTrainer);
        } catch (error) {
          console.error('Failed to parse trainer from sessionStorage:', error);
        }
      } else {
        console.log('Current Trainer is already set:', currentTrainer);
      }
    }, [currentTrainer, setCurrentTrainer]); // Empty dependency array ensures this runs only once on mount
    
    useEffect(() => {
      if (currentTrainer) {
        console.log('Current Trainer updated:', currentTrainer);
      } else {
        console.warn('currentTrainer is still undefined.');
      }
    }, [currentTrainer]);


    function handleAddPost(): void {
        navigate('/addpost');
    }

    const handleScheduleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      if (name === 'scheduleDate') {
        setScheduleDate(value);
      } else if (name === 'scheduleTime') {
        setScheduleTime(value);
      }
      console.log('scheduleDate:', scheduleDate, 'scheduleTime:', scheduleTime);
    };

    const handleSubmitSchedule = async () => {
      if (scheduleDate && scheduleTime) {
        console.log(`Selected Date: ${scheduleDate}, Selected Time: ${scheduleTime}`);
        alert(`Schedule for ${scheduleDate} at ${scheduleTime} has been submitted!`);
        await openNewDate(scheduleDate, scheduleTime);
        setScheduleDate('');
        setScheduleTime('');
      } else {
        alert("Please select both date and time.");
      }
    };

    const handaleDeleteSchedule = async (date: any, time: any) => {
      if (date && time) {
        console.log(`Selected Date: ${date}, Selected Time: ${time}`);
        alert(`Schedule for ${date} at ${time} has been deleted!`);
        await DeleteNewDate(date, time);
        let trainer = await getuserByEmail();
        console.log(currentTrainer.openDates);
        setScheduleDate('');
        setScheduleTime('');
      } else {
        alert("Please select both date and time.");
      }
    };

  return (
    <><>
    <Navigation/>
    </>        <div className="profile-container">
        <div className="profile-header">
          <img src={currentTrainer?.image} alt="Profile" className="profile-image" />
          <h1 className="profile-name">
            {currentTrainer?.first_name} {currentTrainer?.last_name}
          </h1>
          <p className="profile-role">Professional Dog Trainer</p>
        </div>

        <div className="profile-info">
          <h2>Customer Schedules</h2>
          <div className="schedule-list">
          {
            currentTrainer.trainingSchedule.map((schedule: any, index: any) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column',border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <p>Name: {schedule.name}</p>
                <p>Date: {schedule.date}</p>
                <p>Time: {schedule.time}</p>
                <button className="delete-schedule-button"onClick={() => handaleDeleteSchedule(schedule.date, schedule.time)}>Delete</button>
              </div>
            ))
          }
          </div>

          {/* New Schedule Section */}
          <div className="schedule-inputs">
            <h3>Add New Schedule</h3>
            <div className="input-group">
              <label htmlFor="scheduleDate">Date:</label>
              <input
                type="date"
                id="scheduleDate"
                name="scheduleDate"
                value={scheduleDate}
                onChange={handleScheduleChange}
                className="schedule-date-input"
              />
            </div>
            <div className="input-group">
              <label htmlFor="scheduleTime">Time:</label>
              <input
                type="time"
                id="scheduleTime"
                name="scheduleTime"
                value={scheduleTime}
                onChange={handleScheduleChange}
                className="schedule-time-input"
              />
            </div>

            {/* Submit Button for Schedule */}
            <button className="submit-schedule-button" onClick={handleSubmitSchedule}>
              Submit Schedule
            </button>
          </div>
          {/* {currentTrainer?.openDates.length > 0 && (
            <div className="open-schedules-container">
              <h3>Open Schedules</h3>
              <ul className="open-schedules-list">
                {currentTrainer?.openDates.map((schedule: any, index: any) => (
                  <li key={index} className="open-schedule-item">
                    <span>
                      {schedule.date} at {schedule.time}
                    </span>
                    <button
                      className="delete-schedule-button"
                      onClick={() => handaleDeleteSchedule(schedule.date, schedule.time)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )} */}

          <h2>Posts</h2>
          <div className='posts'>
          {
            (currentTrainer?.Posts && currentTrainer?.Posts.length > 0) ?
            currentTrainer?.Posts.map((post: any, index: any) => (
              <div className="posts-container">
                  <div key={index} className="post-item">
                    <img src={post.image} alt={`Post ${index + 1}`} className="post-image" />
                    <p className="post-title">{post.title}</p>
                    <img src={post.image} alt="image post" />
                    <p className="post-title">{post.description}</p>
                    <p className="post-title">{post.likes}</p>
                  </div>
              </div>
            )) :
            <p>No posts found.</p>
          }
          </div>


            {/* Add Post Button */}
            <button className="add-post-button" onClick={handleAddPost}>
              Add Post
            </button>
          </div>
        </div>
          <Footer/>
    </>
  );
};

export default Profile;
