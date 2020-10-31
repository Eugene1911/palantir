import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TSearchClasses>(
  (theme: Theme) => ({
    container: {
      width: '100%',
      marginTop: '22px',
      minHeight: '36px',
    },
    focusedContainer: {
      width: '100%',
    },
    select: {
      marginLeft: '20px',
      fontSize: '14px',
    },
    icon: {
      color: '#9b9b9b',
    },
    focusedIcon: {
      color: theme.palette.primary.main,
    },
    popper: {
      maxWidth: '280px',
    },
  }),
);

export type TSearchClasses =
  | 'container'
  | 'select'
  | 'icon'
  | 'popper'
  | 'focusedContainer'
  | 'focusedIcon';

export default useStyles;
