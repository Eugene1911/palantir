import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TDayTimeSelectorsClasses>(() => ({
  button: {
    marginRight: '20px',
    fontSize: '14px',
  },
  buttonsContainer: {
    marginTop: '26px',
    marginLeft: '38px',
  },
  container: {
    marginTop: '26px',
  },
}));

export type TDayTimeSelectorsClasses =
  | 'button'
  | 'container'
  | 'buttonsContainer';

export default useStyles;
