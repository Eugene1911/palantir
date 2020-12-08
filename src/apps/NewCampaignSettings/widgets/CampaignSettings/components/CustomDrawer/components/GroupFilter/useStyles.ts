import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TGroupFilterClasses>(() => ({
  content: {
    width: '448px',
    padding: '0 24px 20px 24px',
    flexGrow: 1,
    overflowY: 'auto',
  },
  filterContent: {
    paddingTop: '12px',
  },
  divider: {
    margin: '8px 0',
  },
}));

export type TGroupFilterClasses =
  | 'divider'
  | 'filterContent'
  | 'content';

export default useStyles;
