// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_BENEFICIARY = '/beneficiaries';
const ROOTS_VENDORS = '/vendors';
const ROOTS_ADMININSTRATION = '/administration';

const ROOTS_AUTH = '/auth';
const ROOTS_APP = '/app';
const ROOTS_TRANSACTIONS = '/transactions';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  registration: path(ROOTS_AUTH, '/registration'),
  restoreWallet: path(ROOTS_AUTH, '/restore-wallet'),
  linkAgency: path(ROOTS_AUTH, '/link-agency'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
};

export const PATH_BENEFICIARY = {
  root: ROOTS_BENEFICIARY,
  list: path(ROOTS_BENEFICIARY),
};

export const PATH_VENDORS = {
  root: ROOTS_VENDORS,
  list: path(ROOTS_VENDORS),
};

export const PATH_ADMINISTRATION = {
  root: ROOTS_ADMININSTRATION,
  users: path(ROOTS_ADMININSTRATION, '/users'),
  campaigns: path(ROOTS_ADMININSTRATION, '/campaigns'),
};

export const PATH_APP = {
  root: ROOTS_APP,
  settings: path(ROOTS_APP, '/settings'),
};

export const PATH_TRANSACTIONS = {
  root: ROOTS_TRANSACTIONS,
};
