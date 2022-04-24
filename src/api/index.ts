import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { AppResponse, AuthUserInfo, CreateUserInfo, Currency, Role, UserInfo } from '../models';

export const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.API_URL, credentials: 'include' }),
  endpoints: (builder) => ({
    getUserInfo: builder.query<AppResponse<UserInfo>, void>({
      query: () => '/user',
      providesTags: ['User'],
    }),
    register: builder.mutation<AppResponse<UserInfo>, CreateUserInfo>({
      query: (args) => ({
        url: '/user/register',
        method: 'POST',
        body: args,
      }),
      invalidatesTags: ['User'],
    }),
    getUserExists: builder.query<AppResponse<{ exists: boolean }>, { login: string }>({
      query: (args) => ({
        url: `/user/exists?login=${args.login}`,
        method: 'GET',
      }),
    }),
    login: builder.mutation<AppResponse<UserInfo>, AuthUserInfo>({
      query: (info) => ({
        url: '/user/login',
        method: 'POST',
        body: info,
      }),
      invalidatesTags: ['User'],
    }),
    getUserCurrency: builder.query<AppResponse<Currency[]>, void>({
      query: () => '/user/currency',
      providesTags: ['User'],
    }),
    getAllUsers: builder.query<AppResponse<UserInfo[]>, void>({
      query: () => '/user/all',
      providesTags: ['User'],
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({ url: '/user/logout', method: 'POST' }),
      invalidatesTags: ['User'],
    }),
    blockUser: builder.mutation<void, { userId: number }>({
      query: (args) => ({ url: '/user/block', method: 'POST', body: args }),
      invalidatesTags: ['User'],
    }),
    unblockUser: builder.mutation<void, { userId: number }>({
      query: (args) => ({ url: '/user/unblock', method: 'POST', body: args }),
      invalidatesTags: ['User'],
    }),
    setUserRole: builder.mutation<void, { userId: number; role: Role }>({
      query: (args) => ({ url: '/user/role', method: 'POST', body: args }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetUserCurrencyQuery,
  useGetUserExistsQuery,
  useGetAllUsersQuery,
  useLogoutUserMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
  useSetUserRoleMutation,
} = baseApi;
