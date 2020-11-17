import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TFilterHeaderClasses>(() => ({
  header: {
    width: '448px',
    padding: '20px 24px',
  },
  close: {
    color: '#2a2935',
  },
  title: {
    color: '#2a2935',
    fontSize: '18px',
    fontWeight: 500,
  },
  back: {
    color: '#2a2935',
    marginRight: '8px',
  },
  clearFilters: {
    fontSize: '14px',
  },
  titleWrapper: {
    marginRight: 'auto',
  },
}));

export type TFilterHeaderClasses =
  | 'header'
  | 'close'
  | 'title'
  | 'back'
  | 'clearFilters'
  | 'titleWrapper';

export default useStyles;
