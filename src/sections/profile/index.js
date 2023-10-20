import TransparentCard from '@components/card/TransparentCard';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import WalletIcon from '@mui/icons-material/Wallet';
import { CardContent, CardHeader, Divider, Stack, Typography } from '@mui/material';
import truncateEthAddress from '@utils/truncateEthAddress';
import { useAppContext } from 'src/auth/useAppContext';

const Profile = () => {
  const { user } = useAppContext();
  return (
    <Stack style={{ display: 'flex', flex: 1, width: '100' }}>
      <TransparentCard>
        <CardHeader title="Vendor Profile" />
        <CardContent>
          <Stack style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
            <Stack style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PersonOutlineOutlinedIcon color="primary" />
            </Stack>
            <Stack style={{ flex: 1 }}>
              <Typography variant="subtitle2">Name</Typography>
              <Typography variant="h6">{user?.name ? user.name : '-'}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <Stack style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
            <Stack style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LocalPhoneOutlinedIcon color="primary" />
            </Stack>
            <Stack style={{ flex: 1 }}>
              <Typography variant="subtitle2">Phone</Typography>
              <Typography variant="h6">{user?.phone ? user.phone : '-'}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <Stack style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
            <Stack style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MapsHomeWorkOutlinedIcon color="primary" />
            </Stack>
            <Stack style={{ flex: 1 }}>
              <Typography variant="subtitle2">Address</Typography>
              <Typography variant="h6">{user?.address ? JSON.parse(user.address)?.city : '-'}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <Stack style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
            <Stack style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <WalletIcon color="primary" />
            </Stack>
            <Stack style={{ flex: 1 }}>
              <Typography variant="subtitle2">Wallet Address</Typography>
              <Typography variant="h6">
                {user?.walletAddress ? truncateEthAddress(user?.walletAddress) : '-'}
              </Typography>
            </Stack>
          </Stack>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        </CardContent>
      </TransparentCard>
    </Stack>
  );
};

export default Profile;
