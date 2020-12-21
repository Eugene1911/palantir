import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TStartEndDateClasses>(() => ({
  input: {
    marginRight: '56px',
  },
  dateIcon: {
    '& button': {
      marginRight: '-12px',
    },
  },
}));

export type TStartEndDateClasses = 'input' | 'dateIcon';

export default useStyles;
