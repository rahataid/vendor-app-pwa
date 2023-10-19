import WalletExplorerButton from '@components/button/WalletExplorerButton';
import { SPACING } from '@config';
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { checkPropTypes } from 'prop-types';

const ListCard = ({ transactions }) => (
  <Stack mt={4}>
    <Grid container spacing={SPACING.GRID_SPACING}>
      {transactions?.map((transaction) => (
        <Grid item key={transaction?.txHash} xs={12}>
          <Card
            sx={{
              border: '0px',
              backgroundColor: 'rgba(255,255,255,0)',
              backdropFilter: 'blur(50px)',
              // bgcolor: (theme) => theme.palette['primary'].lighter,
            }}
          >
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
          </Card>
        </Grid>
      ))}
    </Grid>
  </Stack>
);

ListCard.propType = {
  transactions: checkPropTypes.array,
};

export default ListCard;
