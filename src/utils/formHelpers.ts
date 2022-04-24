import { Validators } from '@lemoncode/fonk';
import { createFinalFormValidation } from '@lemoncode/fonk-final-form';
import { matchField } from '@lemoncode/fonk-match-field-validator';

const maxLengthValidator = (length = 420) => ({
  validator: Validators.maxLength,
  customArgs: { length },
  message: 'Too long',
});
const requiredValidator = {
  validator: Validators.required,
  message: 'Required',
};

const authValidationSchema = {
  field: {
    email: [
      requiredValidator,
      maxLengthValidator(),
      {
        validator: Validators.email,
        message: 'Invalid',
      },
    ],
    password: [
      requiredValidator,
      maxLengthValidator(128),
      {
        validator: Validators.minLength,
        customArgs: { length: 4 },
        message: 'Too short',
      },
    ],
    confirm: [
      {
        validator: matchField.validator,
        customArgs: { field: 'password' },
        message: 'Passwords should match',
      },
    ],
  },
};

export const validation = createFinalFormValidation(authValidationSchema);
