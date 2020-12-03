import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TBottomFilterClasses>(() => ({
  close: {
    color: '#2a2935',
  },
  filter: {
    padding: '7px 16px',
    borderRadius: '6px',
    background: 'rgba(241, 242, 247, 0.5)',
  },
  filterTitle: {
    fontWeight: 500,
    fontSize: '14px',
  },
  filterButton: {
    margin: '5px 0',
  },
  filterText: {
    fontSize: '16px',
    marginRight: '12px',
    marginLeft: 'auto',
  },
  bottomFilter: {
    padding: '16px 24px 8px',
  },
}));

export type TBottomFilterClasses =
  | 'close'
  | 'filterButton'
  | 'filter'
  | 'filterText'
  | 'filterTitle'
  | 'bottomFilter';

export default useStyles;
