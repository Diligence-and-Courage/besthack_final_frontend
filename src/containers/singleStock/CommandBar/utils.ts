import { ICommandBarItemProps } from '@fluentui/react';

import { ChartType } from '../../../components/Chart';
import { rangeConfig, RangeType } from '../Range';

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
  currentRange: RangeType,
  onChange: (range: RangeType) => void,
): ICommandBarItemProps[] => {
  return Object.values(rangeConfig)
    .filter((cfg) => cfg.type !== currentRange)
    .map((cfg) => ({
      key: cfg.text,
      text: cfg.text,
      onClick: () => onChange(cfg.type),
    }));
};
