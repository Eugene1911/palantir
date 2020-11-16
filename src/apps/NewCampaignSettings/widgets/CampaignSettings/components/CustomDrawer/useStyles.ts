import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TCustomDrawerClasses>(() => ({
  content: {
    width: '448px',
    padding: '0 24px 20px 24px',
    flexGrow: 1,
    overflowY: 'auto',
  },
}));

export type TCustomDrawerClasses = 'content';

export default useStyles;
