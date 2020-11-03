import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TNameAndGroupClasses>(() => ({
  container: {},
  select: {
    marginLeft: '24px',
  },
  manage: {
    marginLeft: '24px',
  },
}));

export type TNameAndGroupClasses = 'container' | 'select' | 'manage';

export default useStyles;
