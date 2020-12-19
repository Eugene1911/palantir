import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TNotesClasses>(() => ({
  button: {
    textTransform: 'none',
    fontSize: '14px',
  },
}));

export type TNotesClasses = 'button';

export default useStyles;
