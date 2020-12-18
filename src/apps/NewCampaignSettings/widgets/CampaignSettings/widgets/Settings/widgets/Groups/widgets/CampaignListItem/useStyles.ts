import { makeStyles, Theme } from '@material-ui/core/styles';

interface ICampaignListItemClassesProps {
  dotColor: string;
}

const useStyles = makeStyles<
  Theme,
  ICampaignListItemClassesProps,
  TCampaignListItemClasses
>(() => ({
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
  dot: {
    marginRight: '8px',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: (props: ICampaignListItemClassesProps): string =>
      props.dotColor,
  },
}));

export type TCampaignListItemClasses =
  | 'name'
  | 'subName'
  | 'container'
  | 'string'
  | 'status'
  | 'dot'
  | 'type';

export default useStyles;
