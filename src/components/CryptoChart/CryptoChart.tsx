import 'chartjs-adapter-date-fns';
import { Fragment, ReactElement, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

// externalComponents
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

// components
import OverlaySpinner from 'components/OverlaySpinner';
import UnableToGetData from 'components/UnableToGetData';

// services
import requestService from 'services/requestService';

// constants
import {
  API_URL,
  CRYPTO_DETAILS,
  CRYPTO_MARKET_CHART,
} from 'constants/api.constants';

// types
import {
  ChartTimelineType,
  CryptoChartDataType,
  CryptoChartQueryType,
} from 'types/cryptoChart.type';

// enums
import CurrencyEnum from 'enums/currency.enum';
import ChartTimelineEnum from 'enums/chartTimeline.enum';

// utils
import {
  getChartDataset,
  getChartOptions,
  timelineConfig,
} from './cryptoChart.utils';

export default function CryptoCurrencyMarketsList({
  id,
}: {
  id: string;
}): ReactElement {
  const [
    cryptoChartData,
    setCryptoChartData,
  ] = useState<CryptoChartDataType | null>(null);
  const [isSpinnerOpen, setIsSpinnerOpen] = useState<boolean>(false);
  const [isUnableToGetData, setIsUnableToGetData] = useState<boolean>(false);
  const [timelineKey, setTimelineKey] = useState<ChartTimelineType>(
    ChartTimelineEnum.day,
  );

  function getCryptoChartData() {
    const params: CryptoChartQueryType = {
      days: timelineConfig[timelineKey].value,
      vs_currency: CurrencyEnum.usd,
    };

    const queryParams = new URLSearchParams(
      params as Record<string, string>,
    ).toString();

    setIsSpinnerOpen(true);
    requestService<CryptoChartDataType>(
      `${API_URL}${CRYPTO_DETAILS}/${id}${CRYPTO_MARKET_CHART}?${queryParams}`,
      {
        headers: new Headers(),
      },
    )
      .then((res) => {
        setIsSpinnerOpen(false);
        setIsUnableToGetData(false);
        setCryptoChartData(res);
      })
      .catch(() => {
        setIsSpinnerOpen(false);
        setIsUnableToGetData(true);
        setCryptoChartData(null);
      });
  }

  useEffect(() => {
    getCryptoChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timelineKey]);

  function getChart() {
    if (cryptoChartData === null) {
      return null;
    }

    const chartOptions = getChartOptions(timelineConfig[timelineKey].unit);
    const dataset = getChartDataset({
      prices: cryptoChartData.prices,
      label: id,
    });

    return <Line type="linear" data={dataset} options={chartOptions} />;
  }

  function getTimelineButtons() {
    return Object.keys(timelineConfig).map((key) => {
      const { text } = timelineConfig[key as ChartTimelineType];
      return (
        <Button
          key={text}
          variant={timelineKey === key ? 'contained' : undefined}
          onClick={() => {
            setTimelineKey(key as ChartTimelineType);
          }}
        >
          {text}
        </Button>
      );
    });
  }

  function getContent() {
    if (isUnableToGetData) {
      return <UnableToGetData />;
    }
    return (
      <Fragment>
        {getChart()}
        <Box mt={2}>{getTimelineButtons()}</Box>
      </Fragment>
    );
  }

  return (
    <Paper>
      <Box p={2}>{getContent()}</Box>
      <OverlaySpinner isOpen={isSpinnerOpen} />
    </Paper>
  );
}
