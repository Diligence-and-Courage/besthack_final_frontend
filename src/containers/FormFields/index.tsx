import { Label, TextField } from '@fluentui/react';
import React from 'react';
import { Field } from 'react-final-form';

import { validation } from '../../utils/formHelpers';
import { Row } from './styled';

interface FormProps {
  input: { onChange: (event: unknown) => void; value: string };
  meta: {
    error?: string;
    submitError?: string;
    touched?: boolean;
  };
}

export const FormField =
  (id: string, type?: string, placeholder?: string) =>
  ({ input, meta }: FormProps) =>
    (
      <TextField
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={`section-blue ${id}`}
        onChange={input.onChange}
        value={input.value}
        errorMessage={
          (meta.error || meta.submitError) && meta.touched ? meta.error || meta.submitError : null
        }
      />
    );

type SignupField = 'name' | 'surname' | 'email' | 'password' | 'confirm';

export const SignupFormRow = (id: SignupField, label: string, type?: string) => (
  <Row>
    <Label htmlFor={id}>{label}</Label>
    <Field
      name={id}
      id={id}
      validate={(value, values, meta) => validation.validateField(meta.name, value, values)}
      component={FormField(id, type)}
    />
  </Row>
);
