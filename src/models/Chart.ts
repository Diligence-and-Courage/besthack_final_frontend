export interface StockCandle {
  close: number;
  open: number;
  high: number;
  low: number;
  time: number;
  value: number;
}

export type StockResolution = '1' | '5' | '15' | '30' | '60' | 'D' | 'W' | 'M';

export type StockCandleQuery = {
  symbols: string;
  resolution?: StockResolution;
  timeFrom?: string;
  timeTo?: string;
};

export type StockCandleResponse = {
  symbol: string;
  candles: StockCandle[] | 'Data not found';
};

export type FinnhubCandles = {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  s: 'ok' | 'no_data';
  t: number[];
  v: number[];
};

export type FinnhubQuote = {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
};

///

export type CurrencyInfo = {
  currencyCode: string;
  name: string;
  symbol: string;
  countryCode: string;
  countryName: string;
};

export type CurrencyCost = {
  baseCode: string;
  code: string;
  cost: number;
  change: number;
  percentChange: number;
};

export type Code = 'EUR' | 'RUB' | 'USD' | 'CHF' | 'GBP' | 'CNY';

export type TimeSeries = '10m' | '30m' | '1h' | '4h';

export type ApiTimeSeriesProps = {
  duration: TimeSeries;
  base: Code;
  code: Code;
};

export type TimeSeriesValues = {
  time: string;
  open: string;
  high: string;
  low: string;
  close: string;
};

export type TimeSeriesRequest = {
  duration: TimeSeries;
  base: Code;
  code: Code;
};
