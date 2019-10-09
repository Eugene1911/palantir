import themeTrafficstars from 'themes/theme.trafficstars';
import themeRunative from 'themes/theme.runative';
import { PROJECTS } from './constants';

const theme =
  process.env.REACT_APP_PRJ === PROJECTS.trafficstars
    ? themeTrafficstars
    : themeRunative;

export default theme;
