import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TCampaignFormHeaderClasses>(
  () => ({
    container: {
      marginBottom: '20px',
    },
    nameContainer: {
      width: 'auto',
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
  | 'nameContainer';

export default useStyles;
