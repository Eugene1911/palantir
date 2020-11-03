import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TCategoriesFilterClasses>(() => ({
  container: {
    marginTop: '40px',
  },
  blackList: {
    fontSize: '14px',
    color: '#ff103e',
    whiteSpace: 'nowrap',

    '&:hover': {
      backgroundColor: 'rgba(220, 0, 78, 0.04)',
    },
  },
  activeBlackListButton: {
    backgroundColor: '#ffe7eb',

    '&:hover': {
      backgroundColor: '#ffdfda',
    },
  },
  addIcon: {
    marginRight: '8px',
    marginBottom: '2px',
  },
  switch: {
    marginRight: '26px',
    textTransform: 'uppercase',
  },
  switchWrapper: {
    flexGrow: 1,
  },
}));

export type TCategoriesFilterClasses =
  | 'container'
  | 'blackList'
  | 'addIcon'
  | 'switch'
  | 'switchWrapper'
  | 'activeBlackListButton';

export default useStyles;
