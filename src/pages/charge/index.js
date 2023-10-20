import { Page } from '@components/page';
import { DashboardProvider } from '@contexts/dashboard';
import DashboardLayout from '@layouts/dashboard/DashboardLayout';
import ChargeBeneficiary from '@sections/charge';

const PAGE_TITLE = 'Charge Beneficiary';

Dashboard.getLayout = (page) => <DashboardLayout pageTitle={PAGE_TITLE}>{page}</DashboardLayout>;

export default function Dashboard() {
  return (
    <DashboardProvider>
      <Page title={PAGE_TITLE} nocard showTitleHeading={false} style={{ display: 'flex', flex: 1 }}>
        <ChargeBeneficiary />
      </Page>
    </DashboardProvider>
  );
}
