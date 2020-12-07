import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TNewGroupDrawerClasses>(() => ({
  content: {
    padding: '24px',
    flexGrow: 1,
  },
}));

export type TNewGroupDrawerClasses = 'content';

export default useStyles;
