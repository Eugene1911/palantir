import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TOpenAdvancedTabsButtonClasses>(
  () => ({
    button: {
      fontSize: '16px',
      textTransform: 'none',
      color: '#2a263a',
      padding: '6px 14px',
      fontWeight: 'normal',
    },
  }),
);

export type TOpenAdvancedTabsButtonClasses = 'button';

export default useStyles;
