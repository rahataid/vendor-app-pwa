import { Page } from '@components/page';
import { DashboardProvider } from '@contexts/dashboard';
import DashboardLayout from '@layouts/dashboard/DashboardLayout';
import Profile from '@sections/profile';

const PAGE_TITLE = 'Profile';

Dashboard.getLayout = (page) => <DashboardLayout pageTitle={PAGE_TITLE}>{page}</DashboardLayout>;

export default function Dashboard() {
  return (
    <DashboardProvider>
      <Page title={PAGE_TITLE} nocard showTitleHeading={false} style={{ display: 'flex', flex: 1 }}>
        <Profile />
      </Page>
    </DashboardProvider>
  );
}
