import React from 'react';

import { Header } from '../../components/Header';
import { Layout } from '../../components/Layout';
import { HEADERS } from '../../constants/texts';
import { AdminUserContent } from './Content';

export const AdminUsersPage = () => {
  return (
    <Layout
      header={<Header pageName={HEADERS.adminUsers} buttons={[]} />}
      left={<AdminUserContent />}
    />
  );
};
