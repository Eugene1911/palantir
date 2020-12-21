import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TCampaignFormNotesClasses>(
  () => ({
    button: {
      textTransform: 'none',
      fontSize: '14px',
    },
  }),
);

export type TCampaignFormNotesClasses = 'button';

export default useStyles;
