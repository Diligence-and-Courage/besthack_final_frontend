import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { CurrencyPage } from '../pages/Currency';
import { CurrencyListPage } from '../pages/CurrencyList';
import { LoginPage } from '../pages/Login';
import MainPage from '../pages/Main';
import { NewsListPage } from '../pages/NewsList';
import { ProfilePage } from '../pages/Profile';
import { ROUTES } from './routes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.login} element={<MainPage />} />
        <Route path={ROUTES.auth} element={<LoginPage />} />
        <Route path={ROUTES.currency + ROUTES.pair} element={<CurrencyPage />} />
        <Route
          path={ROUTES.currency + ROUTES.pair}
          element={<Navigate to={`${ROUTES.currency + ROUTES.code}/USD-RUB`} />} // ?
        />
        <Route
          path={ROUTES.currency + ROUTES.overview + ROUTES.code}
          element={<CurrencyListPage />}
        />
        <Route
          path={ROUTES.currency + ROUTES.overview}
          element={<Navigate to={`${ROUTES.currency + ROUTES.overview}/RUB`} />}
        />
        <Route path={ROUTES.news} element={<NewsListPage />} />
        <Route path={ROUTES.profile} element={<ProfilePage />} />
        {/* <Route path="*" element={<Navigate to={ROUTES.main} />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
