import { DefaultButton } from '@fluentui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { Form } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { useNavigate } from 'react-router-dom';

import { useGetUserExistsQuery, useLoginMutation } from '../../../../api/user';
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
  const [email, setEmail] = useState<string>('');

  const [login, { isSuccess }] = useLoginMutation();
  const { data } = useGetUserExistsQuery({ login: email });
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(ROUTES.profile);
    }
  }, [isSuccess]);

  if (email && data?.data?.exists === false) {
    navigate(`${ROUTES.signup}?email=${email}`);
  }

  const query = useQuery();
  const emailField = useMemo(
    () => SignupFormRow('email', 'E-mail', undefined, query.get('email')),
    [],
  );

  return (
    <Form
      onSubmit={onSubmit(login)}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {emailField}
          {passwordField}
          <OnChange name="email">{(value) => setEmail(value)}</OnChange>
          <BtnRightRow>
            <DefaultButton type="submit">Go</DefaultButton>
          </BtnRightRow>
        </form>
      )}
    />
  );
};
