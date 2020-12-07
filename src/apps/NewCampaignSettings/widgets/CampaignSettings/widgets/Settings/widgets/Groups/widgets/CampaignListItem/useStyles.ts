import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TCampaignListItemClasses>(() => ({
  container: {
    padding: '10px 0',
    flexGrow: 1,
  },
  string: {
    marginBottom: '2px',
  },
  name: {
    fontSize: '16px',
    marginRight: '16px',
  },
  subName: {
    fontSize: '16px',
    color: '#9b9b9b',
  },
  type: {
    fontSize: '13px',
    color: '#9b9b9b',
    marginLeft: 'auto',
    '&:first-letter': {
      textTransform: 'uppercase',
    },
  },
  status: {
    fontSize: '13px',
    color: '#9b9b9b',
    marginLeft: '8x',
    marginRight: '16px',
    '&:first-letter': {
      textTransform: 'uppercase',
    },
  },
}));

export type TCampaignListItemClasses =
  | 'name'
  | 'subName'
  | 'container'
  | 'string'
  | 'status'
  | 'type';

export default useStyles;
