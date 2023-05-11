import React from 'react';
import LoginButton from './components/LoginButton.js'
import LogoutButton from './components/Logout.js'
import Profile from './components/Profile.js'

import Header from './components/Header/header.js'
import Main from './components/Main/main.js'


export default function App() {
  return (
    <div className="App">

      <Header/>
      <Main/>
      <LoginButton />
      <LogoutButton/>
      <Profile/>
    </div>
  );
}
