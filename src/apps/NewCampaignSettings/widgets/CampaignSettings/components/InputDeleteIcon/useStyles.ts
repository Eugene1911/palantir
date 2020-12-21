import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TInputDeleteIconClasses>(
  (theme: Theme) => ({
    deleteIconWrapper: {
      position: 'absolute',
      right: 0,
      marginRight: 0,
    },
    deleteIcon: {
      color: '#cdcdcd',
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
  }),
);

export type TInputDeleteIconClasses =
  | 'deleteIcon'
  | 'deleteIconWrapper';

export default useStyles;
