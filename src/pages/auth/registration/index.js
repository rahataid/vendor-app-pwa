// import DashboardLayout from '@layouts/dashboard/DashboardLayout';
import { AuthProvider } from '@contexts/auth';
import { BasicAuthLayout } from '@layouts/auth';
import { RegistrationView } from '@sections/auth/registration';

const PAGE_TITLE = 'Register';

const Registration = () => (
  <AuthProvider>
    <RegistrationView />
  </AuthProvider>
);

Registration.getLayout = (page) => (
  <BasicAuthLayout title={PAGE_TITLE} showTitleHeading={true}>
    {page}
  </BasicAuthLayout>
);

export default Registration;
