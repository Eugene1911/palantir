import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TProxyTrafficClasses>(() => ({
  radio: {
    marginRight: '40px',
  },
}));

export type TProxyTrafficClasses = 'radio';

export default useStyles;
