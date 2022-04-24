import * as React from 'react';
import { useMemo } from 'react';

import { useGetUserCurrencyQuery } from '../../../../api/user';
import { CardUI } from '../../../../components/CardUI';
import { CurrencyCard } from '../../../../containers/CurrencyCard';
import { CurrencyPair } from '../../../../models';
import { camelize } from '../../../../utils/transforms';
import { ColWrapper } from '../../styled';
import { ErrorMsg } from './styled';

export const UserStocks = () => {
  return <div>no</div>;

  const { data, isSuccess } = useGetUserCurrencyQuery();

  const list: CurrencyPair[] = useMemo(() => {
    if (isSuccess && data) {
      return data.data.map((gotStock) => camelize(gotStock)) as CurrencyPair[];
    }
    return [];
  }, [data, isSuccess]);

  if (isSuccess) {
    return (
      <ColWrapper>
        {list.map((stock, idx) => (
          <CardUI>
            <CurrencyCard {...stock} key={idx} />
            <div>test</div>
          </CardUI>
        ))}
      </ColWrapper>
    );
  }
  return <ErrorMsg>Акции загружаются</ErrorMsg>;
};
