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
      <Routes>
        <Route path='/' element={cookies.token ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/login' element={!cookies.token ? <LoginPage /> : <Navigate to="/" />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/about' element={cookies.token ? <AboutPage /> : <Navigate to="/login" />}></Route>
        <Route path='/notes' element={cookies.token ? <NotesPage /> : <Navigate to="/login" />}></Route>
        <Route path='/verify' >
          <Route path='success' element={<VerifyPage status="success" />} />
          <Route path='failed' element={<VerifyPage status="failed" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
