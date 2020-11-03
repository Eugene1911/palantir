import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TRetargetingClasses>(() => ({
  text: {
    fontSize: '11px',
    textTransform: 'uppercase',
    color: '#9b9b9b',
    marginLeft: '8px',
    fontWeight: 500,
  },
  icon: {
    color: '#cdcdcd',
  },
}));

export type TRetargetingClasses = 'text' | 'icon';

export default useStyles;
