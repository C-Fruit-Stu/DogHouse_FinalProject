import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { TrainerContext } from '../context/TrainerContextProvidor';

interface User {
  id: string;
  name: string;
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate(); 
  const { getAllUsers,DeleteTrainer } = useContext(TrainerContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    // Mock users - replace with actual API call
    const mockUsers: User[] = [];
    let trainers = await getAllUsers();
    console.log('trainers: ', trainers);
    if (trainers) {
      mockUsers.push(...trainers);
    }

    setUsers(mockUsers);
  };

  const handleDeleteUser = async (userId: string) => {
    if(await DeleteTrainer(userId)){
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    }
    else
        alert(`Error: User with ID: ${userId} not found.`);
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

export default ManageUsers;
