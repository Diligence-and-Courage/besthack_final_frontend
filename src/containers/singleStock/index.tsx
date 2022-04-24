import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useCurrencyCandlesQuery } from '../../api/currency';
import { ChartComponent, ChartType } from '../../components/Chart';
import { Code, TimeSeries } from '../../models';
import { CommandBar } from './CommandBar';

export const SingleStock: FC = () => {
  const { pair } = useParams<{ pair: string }>();

  const [duration, setDuration] = useState<TimeSeries>('10m');

  const {
    data: candlesData,
    isLoading,
    isSuccess,
    isError,
  } = useCurrencyCandlesQuery(
    {
      base: pair.split('-')[0] as Code,
      code: pair.split('-')[1] as Code,
      duration,
    },
    { pollingInterval: 1000 * 60 * 3 },
  );

  const [type, setType] = useState<ChartType>('area');
  // const [withVolume, setWithVolume] = useState<boolean>(false);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    return <div>No data found</div>;
  }

  return (
    <>
      <CommandBar
        currentRange={duration}
        currentChart={type}
        onTypeChange={(newType) => setType(newType)}
        onRangeChange={(newRange) => setDuration(newRange)}
      />
      {isSuccess ? (
        <div style={{ width: '100%', height: '50vh' }}>
          <ChartComponent type={type} data={candlesData.data} />
        </div>
      ) : null}
    </>
  );
};
