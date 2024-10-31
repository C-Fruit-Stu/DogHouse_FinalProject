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

        setCurrentTrainer(JSON.parse(sessionStorage.getItem('trainer') as any));
    }  , []);





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
          <ul className="schedule-list">
            <li>Monday: Training with Alex - 10:00 AM</li>
            <li>Wednesday: Training with Max - 2:00 PM</li>
            <li>Friday: Training with Bella - 4:00 PM</li>
          </ul>

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
          {currentTrainer?.openDates.length > 0 && (
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
          )}

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
