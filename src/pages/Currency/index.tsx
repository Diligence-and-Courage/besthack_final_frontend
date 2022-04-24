import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetUserInfoQuery } from '../../api';
import { useGetCurrencyListByCodeQuery } from '../../api/currency';
import { ROUTES } from '../../App/routes';
import { Header } from '../../components/Header';
import { Layout } from '../../components/Layout';
import { HEADER_BUTTONS, HEADERS } from '../../constants/texts';
import { CurrencyPair } from '../../models';
import { camelize } from '../../utils/transforms';
import { Content } from './containers/Content';
import { RightPanel } from './containers/RightPanel';
// import { useGetCurrencyByCodeQuery } from '../../api/currency';

export const CurrencyPage = () => {
  const { pair } = useParams();

  const [current, base] = pair.split('-');
  if (!current || !base) {
    // error
  }

  const { data, isSuccess } = useGetCurrencyListByCodeQuery({ code: base });
  const currencyPair: CurrencyPair = useMemo(() => {
    if (isSuccess && data) {
      const arr = camelize(data.data) as CurrencyPair[];
      return arr.find(
        ({ baseCode }: CurrencyPair) => baseCode.currencyCode === current,
      ) as typeof data.data[0];
    }
    return null;
  }, [data, isSuccess]);

  const user = useGetUserInfoQuery();
  const buttons = useMemo(() => {
    const mainButton = {
      text: HEADER_BUTTONS.newsList,
      link: ROUTES.news,
    };
    if (user.isError) {
      return [
        {
          text: HEADER_BUTTONS.login,
          link: ROUTES.login,
        },
        mainButton,
      ];
    }
    if (user.isSuccess) {
      return [
        {
          text: HEADER_BUTTONS.profile,
          link: ROUTES.profile,
        },
        mainButton,
      ];
    }
    return [mainButton];
  }, [user]);

  return (
    <Layout
      header={<Header pageName={HEADERS.currency(current, base)} buttons={buttons} />}
      left={currencyPair ? <Content {...currencyPair} /> : null}
      right={
        currencyPair ? (
          <RightPanel
            isSuccess={user.isSuccess}
            isError={user.isError}
            user={user.data}
            stockAmount={0}
            stockCost={0 * currencyPair.cost}
            symbol={currencyPair.code.currencyCode}
          />
        ) : null
      }
    />
  );
};
