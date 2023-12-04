import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage';
import Articles from './pages/Articles';
import Login from './pages/Login';
import AddArticle from './pages/AddArticle';
import './scss/style.scss';
import EditPost from './pages/EditPost';
import ArticleDetails from './pages/ArticleDetails';

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');

  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/articles" element={<Articles />} />
          <Route
           path="/login" 
           element={<Login onLogin={(user) => setUserRole(user.role)} />} 
          />
          <Route path="/add-article" element={<AddArticle />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/article/:id" element={<ArticleDetails />} />
      </Routes>
    </Router>
  );
}

export default App;