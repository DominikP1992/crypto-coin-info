// enums
import CurrencyEnum from 'enums/currency.enum';
import TimeUnitEnum from 'enums/timeUnit.enum';

// types
import { ChartDatasetType, TimelineConfigType } from 'types/cryptoChart.type';
import { TimeUnitType } from 'types/timeUnit.type';

export function getChartOptions(unit: TimeUnitType) {
  return {
    animation: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit,
          distribution: 'linear',
        },
        ticks: {
          source: 'auto',
          maxRotation: 0,
          autoSkip: true,
        },
      },
    },
  };
}

export const timelineConfig: TimelineConfigType = {
  day: { unit: TimeUnitEnum.hour, value: 1, text: '24 hours' },
  day14: { unit: TimeUnitEnum.day, value: 14, text: '14 days' },
  month: { unit: TimeUnitEnum.week, value: 30, text: '1 month' },
  month3: { unit: TimeUnitEnum.month, value: 90, text: '3 months' },
  year: { unit: TimeUnitEnum.month, value: 365, text: '1 year' },
  max: { unit: TimeUnitEnum.year, value: 'max', text: 'max' },
};

export function getChartDataset({ label, prices }: ChartDatasetType) {
  const data = prices.map((el) => ({
    x: el[0],
    y: el[1].toFixed(2),
  }));
  return {
    datasets: [
      {
        label: `${label} price (${CurrencyEnum.usd})`,
        data,
        pointRadius: 0,
        borderWidth: 1,
        borderColor: 'black',
        normalized: true,
        fill: { above: 'rgba(0, 0, 0, 0.2)', target: { value: 0 } },
      },
    ],
  };
}
