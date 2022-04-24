import { ICommandBarItemProps } from '@fluentui/react';

import { ChartType } from '../../../components/Chart';
import { TimeSeries } from '../../../models';

export const getName = (chartType: ChartType): string => {
  if (chartType === 'candle') {
    return 'Candle Chart';
  }

  if (chartType === 'bar') {
    return 'Bar Chart';
  }

  if (chartType === 'line') {
    return 'Line Chart';
  }

  if (chartType === 'area') {
    return 'Area Chart';
  }

  return 'Type';
};

export const getIconName = (chartType: ChartType): string => {
  if (chartType === 'candle') {
    return 'AlignVerticalCenter';
  }

  if (chartType === 'bar') {
    return 'GripperBarVertical';
  }

  if (chartType === 'line') {
    return 'LineChart';
  }

  return 'AreaChart';
};

export const getChartItems = (
  currentChart: ChartType,
  items: ICommandBarItemProps[],
): ICommandBarItemProps[] => {
  return items.filter((item) => item.key !== currentChart);
};

export const getRangeItems = (
  currentRange: TimeSeries,
  onChange: (range: TimeSeries) => void,
): ICommandBarItemProps[] => {
  return ['10m', '30m', '1h', '4h']
    .filter((ser: TimeSeries) => ser !== currentRange)
    .map((ser) => ({
      key: ser,
      text: ser,
      onClick: () => onChange(ser as TimeSeries),
    }));
};
