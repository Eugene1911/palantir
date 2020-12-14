export const COOKIE_NAME_AUTH_TOKEN = 'api_token';
export const COOKIE_NAME_REFRESH_TOKEN = 'refresh_token';

// Pagination
export const PAGINATIONS_ROWS_PER_PAGE = [20, 50, 100];
export const PAGINATIONS_DEFAULT_COUNT_PAGE = 20;

// Table
export const TABLE_SORT_DIRECTION_DESCENDING = 'desc';
export const TABLE_SORT_DIRECTION_ASCEDENT = 'asc';

// Wait seccondds
export const DEBOUNCE_SEARCH_WAIT_TIME = 600;

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
  DRAFT: 'draft',
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
export const DATE_REQUEST_FORMAT = 'yyyy-MM-dd';
export const DATE_DETAIL_FORMAT = 'MMM dd, Y, kk:mm';

// Users
export const USERS_ROLES = {
  MANAGER: 2,
};
export const MAX_COUNT_LOAD_USERS = 900;

// I18N Locales path
export const I18N_LOCALES_FILES_PATH = '/locales/{{lng}}/{{ns}}.json';

// Regular expressions
export const REGEXP_AMOUNT = /^[0-9]*\.?[0-9]*$/;

// Multi select
export const MAX_COUNT_SELECTED_ITEMS = 3;
export const ALL_ITEAM_MULTISELECT = {
  name: 'All',
  id: 'all',
};

// Payments types
export const PRICING_MODELS = {
  CPM: 'cpm',
  CPC: 'cpc',
  CPA: 'cpa',
};

// Notifier default options
export const NOTIFIER_DEFAULT_OPTIONS = {
  anchorOrigin: {
    horizontal: 'right',
    vertical: 'bottom',
  },
  autoHideDuration: 3000,
  variant: 'success',
};

// Key codes
export const KEY_ENTER_CODE = 'Enter';

// Name for window - global variables
export const GLOBAL_NAME = 'GLOBAL';

// Status 'draft' for campaign
export const DRAFT_STATUS = 'draft';

// Status 'rejected' for campaign
export const REJECTED_STATUS = 'rejected';

// Status 'paused' for campaign
export const PAUSED_STATUS = 'paused';
