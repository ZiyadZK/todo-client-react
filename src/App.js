import React from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import LoginPage from './Pages/Auth/LoginPage';
import RegisterPage from './Pages/Auth/RegisterPage';
import NotesPage from './Pages/NotesPage';
import VerifyPage from './Pages/Auth/VerifyPage';
import { useCookies } from 'react-cookie';


function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  

  // if(!cookies.token) {
  //   return <Navigate to="/login" />
  // }

  return (
    <Router>
      { !cookies.token ? <Navigate to="/login" /> : "" }
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/about' element={<AboutPage />}></Route>
        <Route path='/notes' element={<NotesPage />}></Route>
        <Route path='/verify' element={<VerifyPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
