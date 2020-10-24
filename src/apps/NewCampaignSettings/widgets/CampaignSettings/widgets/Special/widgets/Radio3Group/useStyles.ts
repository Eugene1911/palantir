import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TRadio3GroupClasses>(() => ({
  radio: {
    marginRight: '40px',
  },
}));

export type TRadio3GroupClasses = 'radio';

export default useStyles;
