import React from 'react';

import { AuthModal } from '../../components/AuthModal';
import { Header } from '../../components/Header';
import { Layout } from '../../components/Layout';
import { HEADERS } from '../../constants/texts';
import { SignupForm } from './containers/SignupForm';

export const SignupPage = () => {
  return (
    <Layout
      header={<Header pageName={HEADERS.signup} />}
      left={
        <AuthModal header="Sign up">
          <SignupForm />
        </AuthModal>
      }
    />
  );
};
