import { Page } from '@components/page';
import { BasicAuthLayout } from '@layouts/auth';
import { RestoreWalletView } from '@sections/auth/restore-wallet';
import React from 'react';

const PAGE_TITLE = 'Restore Wallet';

const RestoreWallet = () => <RestoreWalletView />;

RestoreWallet.getLayout = (page) => (
  <BasicAuthLayout title={PAGE_TITLE} showTitleHeading={true}>
    {page}
  </BasicAuthLayout>
  // <Page title={PAGE_TITLE} nocard>
  // </Page>
);

export default RestoreWallet;
