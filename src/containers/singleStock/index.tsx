import { formatISO, sub } from 'date-fns';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useStockCandlesQuery } from '../../api/currency';
import { ChartComponent, ChartType } from '../../components/Chart';
import { StockCandle } from '../../models/Chart';
import { CommandBar } from './CommandBar';
import { rangeConfig, RangeType } from './Range';

export const SingleStock: FC = () => {
  const { symbol } = useParams<{ symbol: string }>();

  const [range, setRange] = useState<RangeType>('5d');

  const {
    data: candlesData,
    isLoading,
    isSuccess,
  } = useStockCandlesQuery(
    {
      symbols: symbol,
      resolution: rangeConfig[range].resolution,
      timeFrom: formatISO(sub(Date.now(), rangeConfig[range].duration), {
        representation: 'date',
      }),
    },
    { pollingInterval: 1000 * 60 * 3 },
  );

  const [type, setType] = useState<ChartType>('area');
  const [withVolume, setWithVolume] = useState<boolean>(false);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  // export type StockCandleResponse = {
  //   symbol: string;
  //   candles: StockCandle[] | 'Data not found';
  // };

  if (candlesData.data.candles[0] === 'Data not found') {
    return <div>No data found</div>;
  }

  return (
    <>
      <CommandBar
        currentRange={range}
        currVolume={withVolume}
        currentChart={type}
        onVolumeChange={() => setWithVolume(!withVolume)}
        onTypeChange={(newType) => setType(newType)}
        onRangeChange={(newRange) => setRange(newRange)}
      />
      {isSuccess ? (
        <div style={{ width: '100%', height: '50vh' }}>
          <ChartComponent
            withVolume={withVolume}
            type={type}
            data={candlesData.data.candles as StockCandle[]}
          />
        </div>
      ) : null}
    </>
  );
};
