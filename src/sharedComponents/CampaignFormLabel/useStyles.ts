import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TCampaignFormLabelClasses>(
  () => ({
    root: {
      fontSize: '16px',
    },
  }),
);

export type TCampaignFormLabelClasses = 'root';

export default useStyles;
