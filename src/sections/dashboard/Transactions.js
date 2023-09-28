import WalletExplorerButton from '@components/button/WalletExplorerButton';
import { SPACING } from '@config';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Stack, Typography } from '@mui/material';
import { PATH_TRANSACTIONS } from '@routes/paths';
import moment from 'moment';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const TABLE_HEADER = {
  timestamp: {
    label: 'Date',
    align: 'left',
    id: 'timestamp',
  },
  txHash: {
    label: 'Tx Hash',
    align: 'left',
    id: 'txHash',
  },
  tokenDisbursed: {
    label: 'Token Disbursed',
    align: 'left',
    id: 'tokenDisbursed',
  },
};

const Transactions = ({ transactions }) => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader title="Transactions" />
      <CardContent>
        <Stack>
          <Grid container spacing={SPACING.GRID_SPACING}>
            {transactions.map((transaction) => (
              <Grid key={transaction.txHash} item xs={6} sm={6} md={4} lg={3}>
                <Card>
                  <CardContent>
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
                <Divider />
              </Grid>
            ))}
          </Grid>
          <Button variant="outlined" color="secondary" onClick={() => router.push(PATH_TRANSACTIONS.root)}>
            View All
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

Transactions.propType = {
  transactions: PropTypes.array,
};

export default Transactions;
