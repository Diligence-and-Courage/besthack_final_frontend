import { AppResponse, NewsArticle } from '../../models';
import { baseApi } from '../index';

const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    news: builder.query<AppResponse<NewsArticle[]>, void>({ query: () => '/news' }),
  }),
  overrideExisting: false,
});

export const { useNewsQuery } = newsApi;
