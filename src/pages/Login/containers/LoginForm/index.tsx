import { DefaultButton } from '@fluentui/react';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import { useLoginMutation, useRegisterMutation } from '../../../../api/user';
import { ROUTES } from '../../../../App/routes';
import { FormField } from '../../../../containers/FormFields';
import { BtnRightRow, Row } from '../../../../containers/FormFields/styled';
import { validation } from '../../../../utils/formHelpers';
import { decamelize } from '../../../../utils/transforms';

const EmailField = FormField('email', null, 'E-mail');
const PasswordField = FormField('password', 'password', 'Password');
const ConfirmField = FormField('confirm', 'password', 'Repeat password');

interface SubmitData {
  email: string;
  password: string;
}

const onSubmit = (registerFunc) => (values: SubmitData) => {
  registerFunc(decamelize(values));
};

export const LoginForm = () => {
  const [login, loginResponse] = useLoginMutation();
  const [register, registerResponse] = useRegisterMutation();

  const navigate = useNavigate();

  const isRegistration: boolean = useMemo(() => {
    if (
      loginResponse.isError &&
      'status' in loginResponse.error &&
      loginResponse.error.status === 404
    ) {
      return true;
    }
    return isRegistration;
  }, [loginResponse]);

  console.log('isReg', isRegistration);

  useEffect(() => {
    if (loginResponse.isSuccess) {
      navigate(ROUTES.profile);
    }
  }, [loginResponse]);

  const { isError, error } = useMemo(() => {
    if (isRegistration) {
      return registerResponse;
    }
    return loginResponse;
  }, [isRegistration]);

  const callback = useMemo(() => {
    if (isRegistration) {
      return register;
    }
    return login;
  }, [isRegistration]);

  const emailField = useCallback(
    (props) => (
      <EmailField
        // externalError={
        //   isError && 'status' in error && error.status === 404 && 'User with this email not found'
        // } // переходим к регистрации
        {...props}
      />
    ),
    [isError, error],
  );

  const passwordField = useCallback(
    (props) => (
      <PasswordField
        externalError={
          isError &&
          ('status' in error
            ? error.status === 401 && 'Invalid password'
            : 'Invalid email or password')
        }
        {...props}
      />
    ),
    [isError, error],
  );

  const confirmField = useCallback(
    (props) => (
      <ConfirmField
        // externalError={
        //   isError &&
        //   ('status' in error
        //     ? error.status === 401 && 'Invalid password'
        //     : 'Invalid email or password')
        // }
        {...props}
      />
    ),
    [isError, error],
  );

  return (
    <Form
      onSubmit={onSubmit(callback)}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Row>
            <Field
              name="email"
              validate={(value, _, meta) => validation.validateField(meta.name, value)}
              component={emailField}
            />
          </Row>
          <Row>
            <Field
              name="password"
              validate={(value, _, meta) => validation.validateField(meta.name, value)}
              component={passwordField}
            />
          </Row>

          {isRegistration ? (
            <Row>
              <Field
                name="confirm"
                validate={(value, _, meta) => validation.validateField(meta.name, value)}
                component={confirmField}
              />
            </Row>
          ) : null}

          <BtnRightRow>
            <DefaultButton type="submit">Enter</DefaultButton>
          </BtnRightRow>
        </form>
      )}
    />
  );
};
