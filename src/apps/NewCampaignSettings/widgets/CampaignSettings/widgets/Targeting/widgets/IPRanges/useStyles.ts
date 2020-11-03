import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TIPRangesClasses>(() => ({
  radio: {
    marginRight: '40px',
  },
}));

export type TIPRangesClasses = 'radio';

export default useStyles;
