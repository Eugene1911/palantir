export const COOKIE_NAME_AUTH_TOKEN = 'api_token';
export const COOKIE_NAME_REFRESH_TOKEN = 'refresh_token';

// Pagination
export const PAGINATIONS_ROWS_PER_PAGE = [20, 50, 100];
export const PAGINATIONS_DEFAULT_COUNT_PAGE = 20;

// Table
export const TABLE_SORT_DIRECTION_DESCENDING = 'desc';
export const TABLE_SORT_DIRECTION_ASCEDENT = 'asc';

// Snack max count
export const MAX_COUNT_SNACK = 3;
export const AUTO_HIDE_DURATION = 3000; // in ms

// Campaign statuses
export const CAMPAIGNS_STATUSES = {
  PAUSED: 'paused',
  ARCHIVED: 'archived',
  UNAPPROVED: 'unapproved',
  ENABLED: 'enabled',
  REJECTED: 'rejected',
  NO_FUNDS: 'no_funds',
};

// Client statuses
export const CLIENT_STATUSES = {
  PENDING: 'pending',
  INACTIVE: 'inactive',
  FRAUD: 'fraud',
  ACTIVE: 'active',
};

// Projects name
export const PROJECTS = {
  trafficstars: 'trafficstars',
  runative: 'runative',
};

// Load states
export const LOAD_STATES = {
  PENDING: 'pending',
  DONE: 'done',
  ERROR: 'error',
  NOT_LOAD: 'not_load',
};

// Date
export const DATE_MAIN_FORMAT = 'dd.MM.yyyy';
export const CURRENCY_EXCHANGE_DATE_FORMAT = 'yyyy-MM-dd';

// Users
export const USERS_ROLES = {
  MANAGER: 2,
};
export const MAX_COUNT_LOAD_USERS = 900;

// I18N Locales path
export const I18N_LOCALES_FILES_PATH = '/locales/{{lng}}/{{ns}}.json';

// Regular expressions
export const REGEXP_AMOUNT = /^[0-9]*\.?[0-9]*$/;
