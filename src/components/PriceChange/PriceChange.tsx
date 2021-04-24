// icons
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RemoveIcon from '@material-ui/icons/Remove';

// external components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// styles
import usePriceChangeStyles from './priceChange.style';

export default function PriceChange({ value }: { value: number }) {
  const classes = usePriceChangeStyles();

  function getText() {
    const percentageValue = `${value}%`;

    return (
      <Typography variant="caption" display="inline">
        {percentageValue}
      </Typography>
    );
  }

  function getRangeValue() {
    if (value > 0) {
      return (
        <Grid container className={classes.rangeHigher} alignItems="center">
          <ArrowDropUpIcon />
          {getText()}
        </Grid>
      );
    }

    if (value === 0) {
      return (
        <Grid container className={classes.rangeEqual} alignItems="center">
          <RemoveIcon />
          {getText()}
        </Grid>
      );
    }

    return (
      <Grid container className={classes.rangeLower} alignItems="center">
        <ArrowDropDownIcon />
        {getText()}
      </Grid>
    );
  }

  return getRangeValue();
}
