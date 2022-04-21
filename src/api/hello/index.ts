import { baseApi } from '../index';

const helloApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    hello: builder.query<string, void>({ query: () => '/hello' }),
  }),
  overrideExisting: false,
});

export const { useHelloQuery } = helloApi;
