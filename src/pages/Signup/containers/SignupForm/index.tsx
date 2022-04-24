import { DefaultButton } from '@fluentui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { Form } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { useNavigate } from 'react-router-dom';

import { useGetUserExistsQuery, useRegisterMutation } from '../../../../api';
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
const confirmField = SignupFormRow('confirm', 'Repeat password', 'password');

export const SignupForm = () => {
  const [email, setEmail] = useState<string>('');

  const [register, { isSuccess }] = useRegisterMutation();
  const { data } = useGetUserExistsQuery({ login: email });
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(ROUTES.news);
    }
  }, [isSuccess]);

  if (data?.data?.exists) {
    navigate(`${ROUTES.login}?email=${email}`);
  }

  const query = useQuery();

  const emailField = useMemo(
    () => SignupFormRow('email', 'E-mail', undefined, query.get('email')),
    [],
  );

  return (
    <Form
      onSubmit={onSubmit(register)}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {emailField}
          {passwordField}
          {confirmField}
          <OnChange name="email">{(value) => setEmail(value)}</OnChange>
          <BtnRightRow>
            <DefaultButton type="submit">Go</DefaultButton>
          </BtnRightRow>
        </form>
      )}
    />
  );
};
