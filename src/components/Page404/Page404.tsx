import { useHistory } from 'react-router-dom';

// external components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function Page404() {
  const { push: historyPush } = useHistory();

  return (
    <Box mt={2}>
      <Paper>
        <Box p={2}>
          <Typography variant="h2" paragraph>
            404 - page not found
          </Typography>
          <Typography paragraph>
            We are terrible sorry, but we couldn&apos;t find this page for you
            😓
          </Typography>
          <Typography paragraph>
            Fortunately we have interesting place where you where you can check
            info about all cryptocurrencies on the market 😎
          </Typography>

          <Box ml={-1}>
            <Button color="primary" onClick={() => historyPush('/')}>
              Find out more!!
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
