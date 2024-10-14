import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { TrainerContext } from '../context/TrainerContextProvidor';

interface User {
  id: string;
  name: string;
}

const ManageCostumers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate(); 
  const { getAllCostumers } = useContext(TrainerContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    // Mock users - replace with actual API call
    const mockUsers: User[] = [];
    let costumers = await getAllCostumers();
    console.log('trainers: ', costumers);
    if (costumers) {
      mockUsers.push(...costumers);
    }

    setUsers(mockUsers);
  };

  const handleDeleteUser = async (userId: string) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    alert(`User with ID: ${userId} has been deleted.`);
  };

  return (
    <div className="manage-users-container">
      <button className="back-button" onClick={() => navigate('/admin')}>
        ⬅ Back
      </button>

      <h1>Manage Users</h1>

      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <span className="user-name">{user.first_name} {user.last_name} </span>
            <button
              className="delete-button"
              onClick={() => handleDeleteUser(user.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCostumers;
