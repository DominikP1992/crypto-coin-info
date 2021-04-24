import ChartTimelineEnum from 'enums/chartTimeline.enum';
import { CurrencyType } from './currency.type';
import { TimeUnitType } from './timeUnit.type';

type CryptoChartQueryDayType = number | 'max';

export type CryptoChartQueryType = {
  vs_currency: CurrencyType;
  days: CryptoChartQueryDayType;
  interval?: 'daily';
};

export type CryptoChartDataType = {
  prices: [number, number][];
};

export type TimelineConfigElementType = {
  unit: TimeUnitType;
  value: CryptoChartQueryDayType;
  text: string;
};

export type TimelineConfigType = Record<
  ChartTimelineEnum,
  TimelineConfigElementType
>;

export type ChartTimelineType = keyof typeof ChartTimelineEnum;

export type ChartDatasetType = CryptoChartDataType & {
  label: string;
};
