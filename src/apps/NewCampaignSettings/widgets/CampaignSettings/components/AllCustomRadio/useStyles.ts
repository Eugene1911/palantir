import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TAllCustomClasses>(() => ({
  radio: {
    marginRight: '40px',
  },
}));

export type TAllCustomClasses = 'radio';

export default useStyles;
