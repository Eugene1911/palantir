import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TCampaignFormHeaderClasses>(
  () => ({
    container: {
      marginBottom: '20px',
    },
    nameContainer: {
      width: 'auto',
    },
    dateContainer: {
      width: 'auto',
      marginTop: '8px',
      '& p': {
        fontSize: '13px',
      },
    },
    dateUpdated: {
      color: 'rgba(42, 42, 52, 0.5)',
      marginLeft: '12px',
      marginRight: '4px',
    },
    date: {
      marginRight: '12px',
    },
    dateCreated: {
      color: 'rgba(42, 42, 52, 0.5)',
      marginRight: '4px',
    },
    iconWrapper: {
      marginRight: '8px',
      height: '21px',
    },
    name: {
      fontSize: '22px',
      fontWeight: 500,
      marginRight: '8px',
      maxWidth: '50vh',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  }),
);

export type TCampaignFormHeaderClasses =
  | 'container'
  | 'name'
  | 'dateContainer'
  | 'dateCreated'
  | 'dateUpdated'
  | 'date'
  | 'iconWrapper'
  | 'nameContainer';

export default useStyles;
