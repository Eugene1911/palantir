import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TStartEndDateClasses>(() => ({
  input: {
    marginRight: '56px',
  },
}));

export type TStartEndDateClasses = 'input';

export default useStyles;
