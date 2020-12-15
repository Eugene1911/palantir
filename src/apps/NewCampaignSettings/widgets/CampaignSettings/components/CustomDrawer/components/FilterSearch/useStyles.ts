import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TFilterSearchClasses>(
  (theme: Theme) => ({
    icon: {
      color: '#9b9b9b',
    },
    focusedIcon: {
      color: theme.palette.primary.main,
    },
    search: {
      padding: '24px',
      display: 'flex',
    },
    noPadding: {
      padding: '24px 0',
    },
    button: {
      fontSize: '14px',
      flex: 'none',
    },
    buttonWrapper: {
      minWidth: '130px',
      display: 'flex',
      justifyContent: 'flex-end',
    },
  }),
);

export type TFilterSearchClasses =
  | 'icon'
  | 'focusedIcon'
  | 'search'
  | 'button'
  | 'buttonWrapper'
  | 'noPadding';

export default useStyles;
