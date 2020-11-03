import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TDayTimeRangeClasses>(() => ({
  radio: {
    marginRight: '40px',
  },
}));

export type TDayTimeRangeClasses = 'radio';

export default useStyles;
