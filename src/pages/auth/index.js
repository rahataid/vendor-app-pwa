import { AuthProvider } from '@contexts/auth';
import { MainAuthLayout } from '@layouts/auth';
import { Container, Paper } from '@mui/material';
import { AuthView } from '@sections/auth';

const Auth = () => {
  return (
    <AuthProvider>
      <Paper>
        <AuthView />
      </Paper>
    </AuthProvider>
  );
};

Auth.getLayout = (page) => <MainAuthLayout>{page}</MainAuthLayout>;

export default Auth;
