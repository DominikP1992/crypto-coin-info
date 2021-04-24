import { makeStyles } from '@material-ui/core';

const usePriceChangeStyles = makeStyles({
  rangeLower: {
    color: 'red',
  },
  rangeEqual: {
    color: 'blue',
  },
  rangeHigher: {
    color: 'green',
  },
});

export default usePriceChangeStyles;
