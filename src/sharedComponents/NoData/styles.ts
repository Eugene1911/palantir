import { Theme, makeStyles } from '@material-ui/core';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';

type NoDataStylesTypes = {
  root?: BaseCSSProperties;
};
const noDataStyles: NoDataStylesTypes = {
  root: {
    textAlign: 'center',
    padding: `150px 0`,
  },
};
export default makeStyles<Theme, NoDataStylesTypes>(
  (): any => noDataStyles,
);
