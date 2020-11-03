import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TChipsWithFilterClasses>(() => ({
  button: {
    fontSize: '14px',
    marginTop: '8px',
  },
  container: {
    marginTop: '20px',
  },
}));

export type TChipsWithFilterClasses = 'button' | 'container';

export default useStyles;
