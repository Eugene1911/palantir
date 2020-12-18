import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TIPRangesClasses>(() => ({
  radio: {
    marginRight: '40px',
  },
  container: {
    marginTop: '20px',
  },
}));

export type TIPRangesClasses = 'radio' | 'container';

export default useStyles;
