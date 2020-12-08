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
  }),
);

export type TFilterSearchClasses = 'icon' | 'focusedIcon' | 'search';

export default useStyles;
