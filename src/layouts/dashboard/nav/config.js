// routes
// import {
//   PATH_ADMINISTRATION,
//   PATH_BENEFICIARY,
//   PATH_DASHBOARD,
//   PATH_FINANCIAL_INSTITUTIONS,
//   PATH_MOBILIZERS,
//   PATH_PROJECTS,
//   PATH_REPORTS,
//   PATH_VENDORS,
//   PATH_CASH_TRACKER,
//   PATH_PHOTO_GALLERY,
//   PATH_TRANSACTIONS,
// } from '@routes/paths';
// components
import Iconify from '@components/iconify';

// ----------------------------------------------------------------------

const icon = (name) => <Iconify icon={name} sx={{ width: 1, height: 1 }} />;
// const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

// const ICONS = {
//   admin: icon('ic:outline-admin-panel-settings'),
//   projects: icon('pajamas:project'),
//   cashTracker: icon('mdi:cash-clock'),
//   transactions: icon('eos-icons:blockchain'),
//   beneficiary: icon('mdi:user-convert'),
//   dashboard: icon('carbon:dashboard'),
//   vendors: icon('material-symbols:anchor'),
//   mobilizers: icon('ic:baseline-network-ping'),
//   financialInstitution: icon('material-symbols:finance-chip-outline'),
//   reports: icon('iconoir:reports'),
//   photoGallery: icon('material-symbols:gallery-thumbnail-outline-rounded'),
// };

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [],
  },
];

export default navConfig;
