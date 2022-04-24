import {
  AppResponse,
  CurrencyCommon,
  CurrencyPair,
  PostCurrency,
  TimeSeriesValues,
  UserInfo,
} from '../../models';
import { ApiTimeSeriesProps } from '../../models/Chart';
import { baseApi } from '../index';

const currencyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCurrency: builder.query<AppResponse<CurrencyCommon[]>, void>({
      query: () => '/currency/all',
    }),
    getCurrencyListByCode: builder.query<AppResponse<CurrencyPair[]>, { code: string }>({
      query: ({ code }) => `/currency/info?${new URLSearchParams({ code })}`,
    }),
    addCurrency: builder.mutation<AppResponse<UserInfo>, PostCurrency>({
      query: (postCurrency: PostCurrency) => ({
        url: '/user/currency',
        method: 'POST',
        body: postCurrency,
      }),
    }),
    deleteCurrency: builder.mutation<AppResponse<UserInfo>, PostCurrency>({
      query: (postCurrency: PostCurrency) => ({
        url: '/user/currency',
        method: 'DELETE',
        body: postCurrency,
      }),
    }),
    currencyCandles: builder.query<AppResponse<TimeSeriesValues[]>, ApiTimeSeriesProps>({
      query: ({ code, base, duration }) => {
        return `/currency/timeseries?code=${code}&base=${base}&duration=${duration}`;
      },
    }),
  }),
  overrideExisting: false,
});
export const {
  useGetAllCurrencyQuery,
  useGetCurrencyListByCodeQuery,
  useAddCurrencyMutation,
  useDeleteCurrencyMutation,
  useCurrencyCandlesQuery,
} = currencyApi;
