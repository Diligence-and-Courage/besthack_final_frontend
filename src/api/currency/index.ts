import { AppResponse, CurrencyCommon, CurrencyPair, PostCurrency, UserInfo } from '../../models';
import { StockCandleQuery, StockCandleResponse } from '../../models/Chart';
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
    stockCandles: builder.query<AppResponse<StockCandleResponse>, StockCandleQuery>({
      query: ({ symbols, resolution, timeFrom, timeTo }) => {
        let params = `symbols=${symbols}`;

        if (resolution) {
          params += `&resolution=${resolution}`;
        }

        if (timeFrom) {
          params += `&timeFrom=${timeFrom}`;
        }

        if (timeTo) {
          params += `&timeTo=${timeTo}`;
        }

        return `/timeseries?${params}`;
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
  useStockCandlesQuery,
} = currencyApi;
