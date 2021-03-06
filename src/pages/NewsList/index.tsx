import React, { useMemo } from 'react';

import { useGetUserInfoQuery } from '../../api';
import { useNewsQuery } from '../../api/news';
import { ROUTES } from '../../App/routes';
import { CardUI } from '../../components/CardUI';
import { Header } from '../../components/Header';
import { Layout } from '../../components/Layout';
import { HEADER_BUTTONS, HEADERS } from '../../constants/texts';
import { NewsCard } from '../../containers/NewsCard';
import { NewsArticle } from '../../models';
import { camelize } from '../../utils/transforms';
import { CardsWrapper, CardWrapper } from './styled';

export const NewsListPage = () => {
  const { data, isSuccess } = useNewsQuery();
  const stocks: NewsArticle[] = useMemo(() => {
    if (isSuccess && data) {
      return data.data.map((gotStock) => camelize(gotStock) as NewsArticle);
    }
    return [];
  }, [data, isSuccess]);

  const user = useGetUserInfoQuery();
  const buttons = () => {
    if (user.isError) {
      return [
        {
          text: HEADER_BUTTONS.login,
          link: ROUTES.login,
        },
        {
          text: HEADER_BUTTONS.currencyList,
          link: ROUTES.overview,
        },
      ];
    }
    if (user.isSuccess) {
      return [
        {
          text: HEADER_BUTTONS.profile,
          link: ROUTES.profile,
        },
        {
          text: HEADER_BUTTONS.currencyList,
          link: ROUTES.overview,
        },
      ];
    }
    return [];
  };

  return (
    <Layout
      header={<Header pageName={HEADERS.newsList} buttons={buttons()} />}
      left={
        isSuccess && (
          <CardsWrapper>
            {stocks.map((stock, idx) => (
              <CardWrapper key={idx}>
                <CardUI>
                  <NewsCard {...stock} />
                </CardUI>
              </CardWrapper>
            ))}
          </CardsWrapper>
        )
      }
    />
  );
};
