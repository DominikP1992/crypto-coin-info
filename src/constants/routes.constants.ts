import RoutesEnum from 'enums/routes.enum';
import { CRYPTO_DETAILS_ID } from 'constants/routingParams.constants';
import { CRYPTO_MARKET_CHART } from './api.constants';

export const CRYPTO_MARKET_LIST_ROUTE = `/${RoutesEnum.CRYPTO_MARKET_LIST}`;
export const CRYPTO_DETAILS_PAGE_ROUTE = `/${RoutesEnum.CRYPTO_DETAILS}/:${CRYPTO_DETAILS_ID}`;
export const CRYPTO_CHART_ROUTE = `${CRYPTO_DETAILS_PAGE_ROUTE}${CRYPTO_MARKET_CHART}`;
