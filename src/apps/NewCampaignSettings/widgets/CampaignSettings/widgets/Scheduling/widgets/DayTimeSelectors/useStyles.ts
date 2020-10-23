import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TDayTimeSelectorsClasses>(() => ({
  button: {
    marginRight: '20px',
    fontSize: '14px',
  },
  container: {
    marginTop: '26px',
  },
}));

export type TDayTimeSelectorsClasses = 'button' | 'container';

export default useStyles;
