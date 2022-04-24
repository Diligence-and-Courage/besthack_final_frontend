import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { AdminUsersPage } from '../pages/AdminUsers';
import { CurrencyPage } from '../pages/Currency';
import { CurrencyListPage } from '../pages/CurrencyList';
import { LoginPage } from '../pages/Login';
import { NewsListPage } from '../pages/NewsList';
import { ProfilePage } from '../pages/Profile';
import { SignupPage } from '../pages/Signup';
import { ROUTES } from './routes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.signup} element={<SignupPage />} />
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route path={ROUTES.currency} element={<CurrencyPage />} />
        <Route
          path={ROUTES.currency}
          element={<Navigate to={`${ROUTES.currency}/USD-RUB`} />} // ?
        />
        <Route path={ROUTES.codeOverview} element={<CurrencyListPage />} />
        <Route path={ROUTES.overview} element={<Navigate to={`${ROUTES.overview}/RUB`} />} />
        <Route path={ROUTES.news} element={<NewsListPage />} />
        <Route path={ROUTES.profile} element={<ProfilePage />} />
        <Route path={ROUTES.adminUsers} element={<AdminUsersPage />} />
        <Route path="/admin/*" element={<Navigate to={ROUTES.adminUsers} />} />
        <Route path="*" element={<Navigate to={ROUTES.news} />} />
      </Routes>
    </Router>
  );
};

export default App;
