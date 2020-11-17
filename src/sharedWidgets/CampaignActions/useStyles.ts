import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TCampaignActionsClasses>(() => ({
  previous: {
    marginLeft: 'auto',
    marginRight: '8px',
  },
  previousButton: {
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  button: {
    fontSize: '14px',
    textTransform: 'none',
  },
  nextIcon: {
    marginLeft: 0,
  },
  icon: {
    fontSize: '22px',
  },
  nextButton: {
    paddingLeft: '23px',
    paddingRight: '23px',
  },
  container: {
    marginTop: '26px',
  },
  loadingContainer: {
    marginTop: 0,
  },
}));

export type TCampaignActionsClasses =
  | 'previous'
  | 'button'
  | 'nextButton'
  | 'icon'
  | 'previousButton'
  | 'loadingContainer'
  | 'container'
  | 'nextIcon';

export default useStyles;
