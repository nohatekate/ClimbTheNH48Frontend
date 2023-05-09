import React from 'react';
import LoginButton from './components/LoginButton.js'
import LogoutButton from './components/Logout.js'
import Profile from './components/Profile.js'

export default function App() {
  return (
    <div className="App">
      <h1>Welcome to my app 👋</h1>
      <LoginButton />
      <LogoutButton/>
      <Profile/>
    </div>
  );
}
