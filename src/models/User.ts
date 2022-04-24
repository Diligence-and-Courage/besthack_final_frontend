import { Code, CurrencyCost, CurrencyInfo } from './Currency';

export interface User {
  id: number;
  email: string;
  password: string;
  balance: number;
  attempts: number;
  isBlocked: number;
  role: Role;
}

export type UserInfo = Omit<User, 'password'>;
export type CreateUserInfo = Pick<User, 'password' | 'email'>;
export type AuthUserInfo = Pick<User, 'password' | 'email'>;

export type Role = 'common' | 'user' | 'admin';

export type UserCurrenciesAdd = {
  userId: number;
  code: Code;
  count: number;
};

export type UserCurrency = CurrencyInfo &
  Omit<CurrencyCost, 'code' | 'baseCode'> & { count: number };
