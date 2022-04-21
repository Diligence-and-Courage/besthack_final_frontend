import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import MainPage from '../pages/Main';
import { ROUTES } from './routes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.main} element={<MainPage />} />
        <Route path="*" element={<Navigate to={ROUTES.main} />} />
      </Routes>
    </Router>
  );
};

export default App;
