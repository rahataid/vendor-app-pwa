import WalletExplorerButton from '@components/button/WalletExplorerButton';
import TransparentCard from '@components/card/TransparentCard';
import { SPACING } from '@config';
import { Button, CardContent, CardHeader, Grid, Stack, Typography } from '@mui/material';
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
    <TransparentCard>
      <CardHeader title="Transactions" />
      <CardContent style={{ paddingTop: 0 }}>
        <Stack mt={4}>
          <Grid container spacing={SPACING.GRID_SPACING}>
            {transactions.map((transaction) => (
              <Grid item key={transaction?.txHash} xs={12}>
                <TransparentCard>
                  <CardContent sx={{ padding: '10px 16px !important' }}>
                    <Grid container>
                      <Grid
                        item
                        xs={7}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography gutterBottom>{transaction?.name}</Typography>
                          </Grid>

                          <Grid item xs={12}>
                            <Typography sx={{ fontSize: 13 }} color="text.secondary">
                              {moment.unix(transaction.timestamp).format('DD/MM/YYYY')}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={5}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'right' }}>
                              {transaction?.amount ? `${transaction.amount}` : '-'}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography sx={{ textAlign: 'right' }}>
                              <WalletExplorerButton address={transaction.txHash} style={{ padding: 0 }} />
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </TransparentCard>
              </Grid>
            ))}
          </Grid>
        </Stack>
        <Stack mt={3}>
          <Button variant="outlined" color="primary" onClick={() => router.push(PATH_TRANSACTIONS.root)}>
            View All
          </Button>
        </Stack>
      </CardContent>
    </TransparentCard>
  );
};

Transactions.propTypes = {
  transactions: PropTypes.array,
};

export default Transactions;
