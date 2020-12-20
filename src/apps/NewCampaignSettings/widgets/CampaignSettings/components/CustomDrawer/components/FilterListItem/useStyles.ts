import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TFilterListItemClasses>(() => ({
  itemName: {
    fontSize: '16px',
  },
  itemNameNotSelected: {
    color: '#2a2935',
    opacity: 0.5,
  },
  filterItem: {
    cursor: 'pointer',
    padding: '14px 0',
    '&:hover': {
      background: '#f2f2f2',
    },
  },
  divider: {
    margin: '8px 0',
  },
  activeFilterIcon: {
    marginRight: '8px',
  },
  hiddenIcon: {
    visibility: 'hidden',
  },
  filterCounter: {
    margin: '0 0 0 8px',
  },
}));

export type TFilterListItemClasses =
  | 'itemName'
  | 'divider'
  | 'filterItem'
  | 'activeFilterIcon'
  | 'hiddenIcon'
  | 'itemNameNotSelected'
  | 'filterCounter';

export default useStyles;
