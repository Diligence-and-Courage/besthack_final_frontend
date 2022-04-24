import { CommandBar as FluentCommandBar, ICommandBarItemProps } from '@fluentui/react';
import React, { FC } from 'react';

import { ChartType } from '../../../components/Chart';
import { rangeConfig, RangeType } from '../Range';
import { getChartItems, getIconName, getName, getRangeItems } from './utils';

interface CommandBarProps {
  currentChart: ChartType;
  currentRange: RangeType;
  currVolume: boolean;
  onRangeChange: (newRange: RangeType) => void;
  onTypeChange: (newType: ChartType) => void;
  onVolumeChange: () => void;
}

export const CommandBar: FC<CommandBarProps> = ({
  currentChart,
  onTypeChange,
  currVolume,
  onVolumeChange,
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
      text: rangeConfig[currentRange].text,
      iconProps: { iconName: 'TimePicker' },
      subMenuProps: {
        items: getRangeItems(currentRange, onRangeChange),
      },
    },
    {
      key: 'withVolume',
      text: currVolume ? 'Hide volume' : 'Show volume',
      iconProps: { iconName: currVolume ? 'BarChartVerticalFill' : 'BarChartVertical' },
      onClick: onVolumeChange,
    },
  ];

  return <FluentCommandBar items={items} />;
};
