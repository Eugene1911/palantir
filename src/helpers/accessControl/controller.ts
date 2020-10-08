import { AccessControl as SuperAccessControl } from './super/controller';
import { AccessControl as RBACAccessControl } from './rbac/controller';

// Use the flag for debug; in production mode it must be false to use the real Access Control logic;
const IS_SUPER_ALLOWANCE = false;

export default IS_SUPER_ALLOWANCE
  ? SuperAccessControl
  : RBACAccessControl;
