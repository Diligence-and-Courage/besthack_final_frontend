// export interface Currency {
//   id: string;
//   name: string;
//   currentPrice: number;
//   percentChange: number;
//   logo: string;
//   count: number;
// }

export interface Currency {
  currencyCode: string;
  name: string;
  symbol: string;
  countryCode: string;
  countryName: string;
}

export type CurrencyCommon = Pick<Currency, 'currencyCode'>;

export interface CurrencyPair {
  baseCode: Currency;
  code: Currency;
  cost: number;
  change: number;
  percentChange: number;
}

export interface PostCurrency {
  id: string;
  userId: number;
  count: number;
}
