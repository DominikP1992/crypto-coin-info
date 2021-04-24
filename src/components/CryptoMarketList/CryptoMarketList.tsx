import {
  Fragment,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';

// externalComponents
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

// components
import Pagination from 'components/Pagination';
import OverlaySpinner from 'components/OverlaySpinner';
import PriceChange from 'components/PriceChange';
import UnableToGetData from 'components/UnableToGetData';

// services
import requestService from 'services/requestService';

// constants
import { API_URL, CRYPTO_MARKETS_LIST_ENDPOINT } from 'constants/api.constants';
import { CRYPTO_MARKETS_PAGE_NUMBER } from 'constants/routingParams.constants';

// types
import {
  CryptoCurrencyMarketListElementType,
  CryptoCurrencyMarketType,
} from 'types/cryptoCurrencyMarket.type';

// enums
import RoutesEnum from 'enums/routes.enum';
import CurrencyEnum from 'enums/currency.enum';

// styles
import useCryptoMarketListStylesStyle from './cryptoMarketList.style';

export default function CryptoCurrencyMarketsList(): ReactElement {
  const REFRESH_RATE = 20 * 1000;
  const numberOfItemsPerPageArray = ['5', '10', '15', '20', '25'];

  const {
    cryptoMarketsPageNumber,
  }: Record<typeof CRYPTO_MARKETS_PAGE_NUMBER, string> = useParams();
  const { push: historyPush } = useHistory();
  const classes = useCryptoMarketListStylesStyle();
  const [currencyMarketList, setCurrencyMarketList] = useState<
    CryptoCurrencyMarketListElementType[]
  >([]);
  const [isSpinnerOpen, setIsSpinnerOpen] = useState<boolean>(true);
  const [isUnableToGetData, setIsUnableToGetData] = useState<boolean>(false);
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState<string>(
    numberOfItemsPerPageArray[0],
  );

  function updatePage(nextPage: number) {
    historyPush(String(nextPage));
  }

  function redirectToDetails(id: string) {
    historyPush(`/${RoutesEnum.CRYPTO_DETAILS}/${id}`);
  }

  const getCurrencyMarketList = useCallback(() => {
    const params: Record<string, string> = {
      vs_currency: CurrencyEnum.usd,
      per_page: numberOfItemsPerPage,
      price_change_percentage: '24h',
      page: cryptoMarketsPageNumber,
    };

    const queryParams = new URLSearchParams(params).toString();

    setIsSpinnerOpen(true);
    requestService<CryptoCurrencyMarketType[]>(
      `${API_URL}${CRYPTO_MARKETS_LIST_ENDPOINT}?${queryParams}`,
      {
        headers: new Headers(),
      },
    )
      .then((res) => {
        setIsSpinnerOpen(false);
        setIsUnableToGetData(false);
        setCurrencyMarketList(res);
      })
      .catch(() => {
        setIsSpinnerOpen(false);
        setIsUnableToGetData(true);
      });
  }, [cryptoMarketsPageNumber, numberOfItemsPerPage]);

  useEffect(() => {
    getCurrencyMarketList();
    const interval = setInterval(getCurrencyMarketList, REFRESH_RATE);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cryptoMarketsPageNumber, numberOfItemsPerPage]);

  function getTableHead() {
    return (
      <TableHead>
        <TableRow>
          <TableCell align="left">
            <strong>Name</strong>
          </TableCell>
          <TableCell align="left">
            <strong>{`Price (${CurrencyEnum.usd})`}</strong>
          </TableCell>
          <TableCell align="left">
            <strong>24h (%)</strong>
          </TableCell>
          <TableCell align="left">
            <strong>{`24h Max (${CurrencyEnum.usd})`}</strong>
          </TableCell>
          <TableCell align="left">
            <strong>{`24h Min (${CurrencyEnum.usd})`}</strong>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }

  function getTableBody() {
    return (
      <TableBody>
        {currencyMarketList.map(
          ({
            name,
            image,
            current_price,
            price_change_percentage_24h,
            high_24h,
            low_24h,
            id,
          }) => (
            <TableRow key={id}>
              <TableCell className={classes.tableCell}>
                <Button onClick={() => redirectToDetails(id)}>
                  <Avatar src={image} aria-hidden className={classes.image} />
                  {name}
                </Button>
              </TableCell>
              <TableCell align="left">{current_price}</TableCell>
              <TableCell align="left">
                <PriceChange value={price_change_percentage_24h} />
              </TableCell>
              <TableCell align="left">{high_24h}</TableCell>
              <TableCell align="left">{low_24h}</TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    );
  }

  function getNumberOfItemsSelector() {
    const labelId = 'numberOfItemsPerPage';

    return (
      <FormControl>
        <InputLabel id={labelId}>Items per page</InputLabel>
        <Select
          labelId={labelId}
          value={numberOfItemsPerPage}
          className={classes.select}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            setNumberOfItemsPerPage(`${event.target.value}`)}
        >
          {numberOfItemsPerPageArray.map((itemsPerPage) => (
            <MenuItem value={itemsPerPage} key={itemsPerPage}>
              {`${itemsPerPage} items`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  function getCryptoMarketListHeader() {
    return (
      <Grid container justify="space-between" alignItems="center">
        <Box pl={1}>
          <Typography variant="h5" component="h2">
            {`Page ${cryptoMarketsPageNumber}`}
          </Typography>
        </Box>
        <Pagination
          currentPage={Number(cryptoMarketsPageNumber)}
          handleChange={updatePage}
        />
      </Grid>
    );
  }

  function getCryptoMarketList() {
    return (
      <TableContainer>
        <Table aria-label="currency market list">
          {getTableHead()}
          {getTableBody()}
        </Table>
      </TableContainer>
    );
  }

  function getCryptoMarketListFooter() {
    return (
      <Box mt={2} mb={1}>
        <Grid container justify="flex-end" alignItems="center">
          {getNumberOfItemsSelector()}
          <Pagination
            currentPage={Number(cryptoMarketsPageNumber)}
            handleChange={(nextPage) => {
              updatePage(nextPage);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </Grid>
      </Box>
    );
  }

  function getCurrencyMarketListContent() {
    return (
      <Fragment>
        {getCryptoMarketListHeader()}
        {getCryptoMarketList()}
        {getCryptoMarketListFooter()}
      </Fragment>
    );
  }

  function getContent() {
    if (isUnableToGetData) {
      return <UnableToGetData />;
    }

    return Boolean(currencyMarketList.length) && getCurrencyMarketListContent();
  }

  return (
    <Box mt={2} mb={2}>
      <Paper>
        <Box p={2}>
          {getContent()}
        </Box>
      </Paper>
      <OverlaySpinner isOpen={isSpinnerOpen} />
    </Box>
  );
}
