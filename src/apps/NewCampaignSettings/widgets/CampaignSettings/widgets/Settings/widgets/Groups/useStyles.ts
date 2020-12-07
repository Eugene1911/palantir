import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TNameAndGroupClasses>(() => ({
  select: {
    marginLeft: '24px',
  },
  manage: {
    marginLeft: '24px',
    fontSize: '14px',
  },
}));

export type TNameAndGroupClasses = 'select' | 'manage';

export default useStyles;
