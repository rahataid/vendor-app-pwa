import SummaryCard from '@components/SummaryCard';
import { SPACING } from '@config';
import { Card, CardContent, Grid } from '@mui/material';
import PropTypes from 'prop-types';
// import { LoadingBalance } from './Loading';

const TokenInfo = ({ chainData, fetchingChainData }) => (
  <Card>
    <CardContent>
      <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={SPACING.GRID_SPACING}>
        <Grid item xs={6}>
          <SummaryCard
            title={'Allowance'}
            total={chainData?.allowance || '-'}
            subtitle={'tokens'}
            loading={fetchingChainData}
          />
        </Grid>
        <Grid item xs={6}>
          <SummaryCard
            color="success"
            title={'Disbursed'}
            total={chainData?.disbursed || '-'}
            subtitle={'tokens'}
            loading={fetchingChainData}
          />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

TokenInfo.propTypes = {
  fetchingChainData: PropTypes.bool,
  chainData: PropTypes.object,
  vendorInfo: PropTypes.object,
};

export default TokenInfo;
