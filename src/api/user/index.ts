import { AppResponse, AuthUserInfo, CreateUserInfo, Currency, UserInfo } from '../../models';
import { baseApi } from '../index';

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query<AppResponse<UserInfo>, void>({
      query: () => '/user',
    }),
    register: builder.mutation<AppResponse<UserInfo>, CreateUserInfo>({
      query: (args) => ({
        url: '/user/register',
        method: 'POST',
        body: args,
      }),
    }),
    login: builder.mutation<AppResponse<UserInfo>, AuthUserInfo>({
      query: (info) => ({
        url: '/user/login',
        method: 'POST',
        body: info,
      }),
    }),
    getUserCurrency: builder.query<AppResponse<Currency[]>, void>({
      query: () => '/user/currency',
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserInfoQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetUserCurrencyQuery,
} = userApi;
