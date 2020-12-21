import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TTopFilterClasses>(() => ({
  filter: {
    padding: '7px 16px',
    borderRadius: '6px',
    background: 'rgba(241, 242, 247, 0.5)',
    cursor: 'pointer',
  },
  filterTitle: {
    fontWeight: 500,
    fontSize: '14px',
  },
  topFilter: {
    padding: '16px 24px 8px',
    marginBottom: '-16px',
  },
}));

export type TTopFilterClasses =
  | 'filter'
  | 'filterTitle'
  | 'topFilter';

export default useStyles;
