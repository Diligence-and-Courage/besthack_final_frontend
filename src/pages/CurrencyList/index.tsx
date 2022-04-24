import { Dropdown, IDropdownOption } from '@fluentui/react';
import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetUserInfoQuery } from '../../api';
import { useGetAllCurrencyQuery, useGetCurrencyListByCodeQuery } from '../../api/currency';
import { ROUTES } from '../../App/routes';
import { CardUI } from '../../components/CardUI';
import { Header } from '../../components/Header';
import { Layout } from '../../components/Layout';
import { HEADER_BUTTONS, HEADERS } from '../../constants/texts';
import { CurrencyCard } from '../../containers/CurrencyCard';
import { Currency, CurrencyPair } from '../../models';
import { camelize } from '../../utils/transforms';
import { CardsWrapper, CardWrapper, PageWrapper } from './styled';

export const CurrencyListPage = () => {
  const { code } = useParams();

  const optionsResponse = useGetAllCurrencyQuery();
  const options =
    optionsResponse.isSuccess && optionsResponse.data
      ? camelize(optionsResponse.data.data).map(({ currencyCode }: Currency) => ({
          key: currencyCode,
          text: currencyCode,
        }))
      : [];

  const { data, isSuccess } = useGetCurrencyListByCodeQuery({ code });
  const currencies: CurrencyPair[] = useMemo(() => {
    if (isSuccess && data) {
      return data.data.map((gotCurrency) => camelize(gotCurrency) as CurrencyPair);
    }
    return [];
  }, [data, isSuccess]);

  const navigate = useNavigate();
  const changeBase = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    navigate(`${ROUTES.overview}/${item.key}`);
  };

  const user = useGetUserInfoQuery();
  const buttons = useMemo(() => {
    const res = [
      {
        text: HEADER_BUTTONS.newsList,
        link: ROUTES.news,
      },
    ];

    if (user.isError) {
      res.push({
        text: HEADER_BUTTONS.login,
        link: ROUTES.login,
      });
    } else if (user.isSuccess) {
      res.push({
        text: HEADER_BUTTONS.profile,
        link: ROUTES.profile,
      });
    }
    return res;
  }, [user]);

  return (
    <Layout
      header={<Header pageName={HEADERS.currencyList} buttons={buttons} />}
      left={
        isSuccess ? (
          <PageWrapper>
            <Dropdown
              placeholder="Select an option"
              label="Выберите базовую валюту"
              options={options}
              defaultSelectedKey={code}
              onChange={changeBase}
              // dropdownWidth={0}
            />
            <CardsWrapper>
              {currencies.map((currency, idx) => (
                <CardWrapper key={idx}>
                  <CardUI>
                    <CurrencyCard {...currency} />
                  </CardUI>
                </CardWrapper>
              ))}
            </CardsWrapper>
          </PageWrapper>
        ) : null
      }
    />
  );
};
