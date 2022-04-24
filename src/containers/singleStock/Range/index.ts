import { Duration } from 'date-fns';

import { StockResolution } from '../../../models/Chart';

export type RangeType = '1d' | '5d' | '1m' | '5m' | '1y' | '5y';

export type Range = {
  text: string;
  type: RangeType;
  resolution: StockResolution;
  duration: Duration;
};

export type RangeConfig = Record<RangeType, Range>;

export const rangeConfig: RangeConfig = {
  '1d': { text: '1 day', type: '1d', duration: { days: 1 }, resolution: '30' },
  '5d': { text: '5 days', type: '5d', duration: { days: 5 }, resolution: '60' },
  '1m': { text: '1 month', type: '1m', duration: { months: 1 }, resolution: '60' },
  '5m': { text: '5 months', type: '5m', duration: { months: 5 }, resolution: 'D' },
  '1y': { text: '1 year', type: '1y', duration: { years: 5 }, resolution: 'W' },
  '5y': { text: '5 years', type: '5y', duration: { years: 5 }, resolution: 'M' },
};
