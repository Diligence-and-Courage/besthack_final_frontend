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
