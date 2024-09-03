import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Admin: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-container">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <h2 className="admin-logo">Admin Dashboard</h2>
        <ul className="admin-nav">
          <li>
            <Link to="/admin/users" className="admin-link">Manage Users</Link>
          </li>
          <li>
            <Link to="/admin/reports" className="admin-link">View Reports</Link>
          </li>
          <li>
            <Link to="/admin/settings" className="admin-link">Settings</Link>
          </li>
          <li>
            <Link to="/" className="admin-link">Logout</Link>
          </li>
        </ul>
      </div>
      <div className="admin-content">
        <h1>Welcome, Admin!</h1>
        <p>Select an option from the sidebar to get started.</p>
      </div>
    </div>
  );
};

export default Admin;
