import { CommandBar as FluentCommandBar, ICommandBarItemProps } from '@fluentui/react';
import React, { FC } from 'react';

import { ChartType } from '../../../components/Chart';
import { TimeSeries } from '../../../models';
import { getChartItems, getIconName, getName, getRangeItems } from './utils';

interface CommandBarProps {
  currentChart: ChartType;
  currentRange: TimeSeries;
  onRangeChange: (newRange: TimeSeries) => void;
  onTypeChange: (newType: ChartType) => void;
}

export const CommandBar: FC<CommandBarProps> = ({
  currentChart,
  onTypeChange,
  currentRange,
  onRangeChange,
}) => {
  const subItems: ICommandBarItemProps[] = [
    {
      key: 'area',
      text: getName('area'),
      onClick: () => onTypeChange('area'),
      iconProps: { iconName: getIconName('area') },
    },
    {
      key: 'bar',
      text: getName('bar'),
      onClick: () => onTypeChange('bar'),
      iconProps: { iconName: getIconName('bar') },
    },
    {
      key: 'candle',
      text: getName('candle'),
      onClick: () => onTypeChange('candle'),
      iconProps: { iconName: getIconName('candle') },
    },
    {
      key: 'line',
      text: getName('line'),
      onClick: () => onTypeChange('line'),
      iconProps: { iconName: getIconName('line') },
    },
  ];

  const items: ICommandBarItemProps[] = [
    {
      key: 'chartType',
      text: getName(currentChart),
      iconProps: { iconName: getIconName(currentChart) },
      subMenuProps: { items: getChartItems(currentChart, subItems) },
    },
    {
      key: 'range',
      text: currentRange,
      iconProps: { iconName: 'TimePicker' },
      subMenuProps: {
        items: getRangeItems(currentRange, onRangeChange),
      },
    },
  ];

  return <FluentCommandBar items={items} />;
};
