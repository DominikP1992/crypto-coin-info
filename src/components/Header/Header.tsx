import { useHistory } from 'react-router-dom';

// external components
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

// icons
import HomeIcon from '@material-ui/icons/Home';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

// styles
import useHeaderStyles from './header.style';

export default function Header() {
  const { push: historyPush } = useHistory();
  const classes = useHeaderStyles();

  return (
    <AppBar position="static" className={classes.header}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={11} md={10}>
          <Grid container justify="space-between" alignItems="center">
            <Box pt={2} pb={2}>
              <AccountBalanceIcon className={classes.icon} />
              <Typography variant="h4" component="h1" display="inline">
                Crypto coin info
              </Typography>
            </Box>
            <Grid item>
              <IconButton size="medium" onClick={() => historyPush('/')}>
                <HomeIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
}
