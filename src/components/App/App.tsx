import { ReactElement } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

// external components
import Grid from '@material-ui/core/Grid';

// components
import CryptoMarketList from 'components/CryptoMarketList';
import CryptoDetailsPage from 'components/CryptoDetailsPage';
import Header from 'components/Header';
import Page404 from 'components/Page404';

// constants
import { CRYPTO_MARKETS_PAGE_NUMBER } from 'constants/routingParams.constants';
import {
  CRYPTO_DETAILS_PAGE_ROUTE,
  CRYPTO_MARKET_LIST_ROUTE,
} from 'constants/routes.constants';

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Grid container justify="center">
        <Header />
        <Grid item xs={11} md={10}>
          <Switch>
            <Route exact path="/">
              <Redirect to={`${CRYPTO_MARKET_LIST_ROUTE}/1`} />
            </Route>
            <Route exact path={`${CRYPTO_MARKET_LIST_ROUTE}`}>
              <Redirect to={`${CRYPTO_MARKET_LIST_ROUTE}/1`} />
            </Route>
            <Route
              exact
              path={`${CRYPTO_MARKET_LIST_ROUTE}/:${CRYPTO_MARKETS_PAGE_NUMBER}`}
            >
              <CryptoMarketList />
            </Route>
            <Route path={`${CRYPTO_DETAILS_PAGE_ROUTE}`}>
              <CryptoDetailsPage />
            </Route>
            <Route path="*"><Page404 /></Route>
          </Switch>
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
