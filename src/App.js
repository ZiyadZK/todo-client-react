import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import LoginPage from './Pages/Auth/LoginPage';
import RegisterPage from './Pages/Auth/RegisterPage';
import NotesPage from './Pages/NotesPage';

function App() {

  const routeList = [
    { path: '/', page: <HomePage />},
    { path: '/login', page: <LoginPage />},
    { path: '/register', page: <RegisterPage />},
    { path: '/about', page: <AboutPage />},
    { path: '/notes', page: <NotesPage />}
  ]

  return (
    <Router>
      <Routes>
        { routeList.map((key, index) => (
          <Route exact path={key.path} element={key.page} key={index} />
        )) }
      </Routes>
    </Router>
  );
}

export default App;
