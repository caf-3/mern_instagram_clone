import React from 'react';
import Navbar from './components/Navbar';
import Router from './Routes/Router';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './Context/UserContext';
import './App.css'
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Router />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
