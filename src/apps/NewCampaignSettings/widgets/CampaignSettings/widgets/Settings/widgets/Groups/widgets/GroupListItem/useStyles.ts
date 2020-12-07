import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TGroupListItemClasses>(() => ({
  editIcon: {
    color: '#9b9b9b',
  },
  accordion: {
    boxShadow: 'none',
    border: 'none',
    '&::before': {
      height: 0,
    },
    '&:hover': {
      background: '#f5f7f9',
    },
  },
  accordionSummary: {
    padding: '0 24px',
    boxShadow: 'none',
    border: 'none',
    // height: '48px',
    minHeight: '48px',
  },
  accordionSummaryExpanded: {
    // height: '48px',
    minHeight: '48px !important',
  },
  accordionSummaryExpandIcon: {
    height: '24px',
    minHeight: '24px !important',
  },
  accordionSummaryContent: {
    margin: '0 !important',
    alignItems: 'center',
  },
  accordionExpanded: {
    margin: '0 !important',
  },
  accordionDetails: {
    display: 'block',
    padding: '0 24px',
  },
  name: {
    fontSize: '16px',
    marginRight: '16px',
  },
  infoText: {
    fontSize: '16px',
    color: '#9b9b9b',
    marginLeft: 'auto',
    marginRight: '16px',
  },
}));

export type TGroupListItemClasses =
  | 'editIcon'
  | 'name'
  | 'infoText'
  | 'accordion'
  | 'accordionExpanded'
  | 'accordionSummary'
  | 'accordionSummaryExpanded'
  | 'accordionSummaryExpandIcon'
  | 'accordionSummaryContent'
  | 'accordionDetails';

export default useStyles;
