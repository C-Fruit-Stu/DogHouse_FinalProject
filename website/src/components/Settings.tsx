import React, { useState } from 'react';
import '../index.css';

const Settings: React.FC = () => {
  const [theme, setTheme] = useState('light');
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
    alert(`Theme changed to: ${e.target.value}`);
  };

  const handleNotificationToggle = () => {
    setEmailNotifications(!emailNotifications);
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      <div className="settings-section">
        <h2>System Preferences</h2>
        <label>
          App Theme:
          <select value={theme} onChange={handleThemeChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>

      <div className="settings-section">
        <h2>Notifications</h2>
        <label>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={handleNotificationToggle}
          />
          Enable Email Notifications
        </label>
      </div>
    </div>
  );
};

export default Settings;
