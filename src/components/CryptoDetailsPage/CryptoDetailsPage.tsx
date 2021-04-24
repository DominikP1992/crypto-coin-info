import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';

// external components
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

// components
import CryptoDetails from 'components/CryptoDetails/CryptoDetails';
import CryptoChart from 'components/CryptoChart';
import TabPanel from 'components/TabPanel';

// constants
import { CRYPTO_DETAILS_ID } from 'constants/routingParams.constants';

export default function CryptoDetailsPage() {
  const [value, setValue] = useState(0);
  const {
    cryptoDetailsPageId,
  }: Record<typeof CRYPTO_DETAILS_ID, string> = useParams();

  return (
    <Fragment>
      <Box mb={2}>
        <Tabs onChange={(e, val) => setValue(val)} value={value}>
          <Tab label="Details" />
          <Tab label="Chart" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CryptoDetails id={cryptoDetailsPageId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CryptoChart id={cryptoDetailsPageId} />
      </TabPanel>
    </Fragment>
  );
}
