import { DefaultButton } from '@fluentui/react';
import React, { useEffect, useMemo } from 'react';
import { Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import { useGetUserInfoQuery, useLoginMutation } from '../../../../api';
import { ROUTES } from '../../../../App/routes';
import { SignupFormRow } from '../../../../containers/FormFields';
import { BtnRightRow } from '../../../../containers/FormFields/styled';
import { useQuery } from '../../../../hooks/useQuery';
import { CreateUserInfo } from '../../../../models';
import { decamelize } from '../../../../utils/transforms';

interface SubmitData {
  email: string;
  password: string;
  confirm: string;
}

const onSubmit =
  (registerFunc: (a: any) => any) =>
  ({ email, password }: SubmitData) => {
    const mappedData: CreateUserInfo = {
      email,
      password,
    };
    registerFunc(decamelize(mappedData));
  };

const passwordField = SignupFormRow('password', 'Password', 'password');

export const LoginForm = () => {
  const [login, { isSuccess }] = useLoginMutation();
  const { refetch } = useGetUserInfoQuery();
  const navigate = useNavigate();

  const query = useQuery();
  const emailField = useMemo(
    () => SignupFormRow('email', 'E-mail', undefined, query.get('email')),
    [],
  );

  useEffect(() => {
    if (isSuccess) {
      refetch();
      navigate(ROUTES.news);
    }
  }, [isSuccess]);

  return (
    <Form
      onSubmit={onSubmit(login)}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {emailField}
          {passwordField}
          <BtnRightRow>
            <DefaultButton type="submit">Go</DefaultButton>
          </BtnRightRow>
        </form>
      )}
    />
  );
};
