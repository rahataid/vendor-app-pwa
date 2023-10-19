import WalletExplorerButton from '@components/button/WalletExplorerButton';
import { SPACING } from '@config';
import { Card, CardActions, CardContent, Grid, Stack } from '@mui/material';
import moment from 'moment';
import { checkPropTypes } from 'prop-types';
import Typography from 'src/theme/overrides/Typography';

const RectangularCard = ({ transactions }) => (
  <Stack>
    <Grid container spacing={SPACING.GRID_SPACING}>
      {transactions?.map((transaction) => (
        <Grid key={transaction.txHash} item xs={6} sm={6} md={4} lg={3}>
          <Card
            sx={{
              border: '0px',
              backgroundColor: 'rgba(255,255,255,0)',
              backdropFilter: 'blur(50px)',
              // bgcolor: (theme) => theme.palette['primary'].lighter,
            }}
          >
            <CardContent sx={{ padding: 2 }}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {moment.unix(transaction.timestamp).format('DD/MM/YYYY')}
              </Typography>
              <Typography variant="h5" component="div">
                {transaction.amount}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {transaction?.name}
              </Typography>
            </CardContent>
            <CardActions>
              <WalletExplorerButton address={transaction.txHash} />
            </CardActions>
          </Card>
          {/* <Divider /> */}
        </Grid>
      ))}
    </Grid>
  </Stack>
);

Card.propType = {
  RectangularCard: checkPropTypes.array,
};

export default RectangularCard;
