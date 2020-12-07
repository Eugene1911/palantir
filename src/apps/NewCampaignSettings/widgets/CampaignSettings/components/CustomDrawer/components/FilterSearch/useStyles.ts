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
    },
    noPadding: {
      padding: '24px 0',
    },
  }),
);

export type TFilterSearchClasses =
  | 'icon'
  | 'focusedIcon'
  | 'search'
  | 'noPadding';

export default useStyles;
