import { Page } from '@components/page';
import { DashboardProvider } from '@contexts/dashboard';
import DashboardLayout from '@layouts/dashboard/DashboardLayout';
import { DashboardView } from '@sections/dashboard';

const PAGE_TITLE = 'Dashboard';

Dashboard.getLayout = (page) => <DashboardLayout pageTitle={PAGE_TITLE}>{page}</DashboardLayout>;

export default function Dashboard() {
  return (
    <DashboardProvider>
      <Page title={PAGE_TITLE} nocard showTitleHeading={false} style={{ display: 'flex', flex: 1 }}>
        <DashboardView />
      </Page>
    </DashboardProvider>
  );
}

// export default function Dashboard() {
//   return <>hello this is dashboard</>;
// }
