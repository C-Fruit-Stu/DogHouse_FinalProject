import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { TrainerContext } from '../context/TrainerContextProvidor';

interface User {
  id: string;
  first_name: string;
  last_name: string;
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const navigate = useNavigate();
  const { getAllUsers, DeleteTrainer } = useContext(TrainerContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true); // Show loading spinner
    try {
      const trainers = await getAllUsers();
      if (trainers) {
        setUsers(trainers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const handleDeleteUser = async (userId: string) => {
    setLoading(true); // Show loading spinner during deletion
    try {
      if (await DeleteTrainer(userId)) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        alert(`User with ID: ${userId} has been deleted.`);
      } else {
        alert(`Error: User with ID: ${userId} not found.`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="manage-users-container">
      <button className="back-button" onClick={() => navigate('/admin')}>
        ⬅ Back
      </button>

      <h1>Manage Users</h1>

      {loading ? (
        <div className="loading-spinner"></div> // Loading spinner
      ) : (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <span className="user-name">
                {user.first_name} {user.last_name}
              </span>
              <button
                className="delete-button"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageUsers;
