import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { TrainerContext } from '../context/TrainerContextProvidor';
import { CoustumerType } from '../types/TrainerType';

const ManageCostumers: React.FC = () => {
  const [users, setUsers] = useState<CoustumerType[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const navigate = useNavigate();
  const { getAllCostumers, allCostumers, DeleteCostumer } = useContext(TrainerContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true); // Show loading spinner
    try {
      const costumers = await getAllCostumers();
      if (costumers) {
        setUsers(costumers); // Populate users
      }
    } catch (error) {
      console.error('Error fetching costumers:', error);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const handleDeleteUser = async (userId: string) => {
    setLoading(true); // Show loading spinner during deletion
    try {
      if (await DeleteCostumer(userId)) {
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

      <h1>Manage Costumers</h1>

      {loading ? (
        <div className="loading-spinner"></div> // Loading spinner
      ) : (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <span className="user-name">{user.first_name} {user.last_name}</span>
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

export default ManageCostumers;
