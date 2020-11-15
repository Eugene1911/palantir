import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TListCategoryClasses>(() => ({
  accordion: {
    boxShadow: 'none',
    border: 'none',
    '&::before': {
      height: 0,
    },
  },
  accordionSummary: {
    padding: 0,
    boxShadow: 'none',
    border: 'none',
    marginLeft: '-9px',
    height: '48px',
    minHeight: '48px',
  },
  accordionSummaryExpanded: {
    height: '48px',
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
    padding: '0 0 8px 20px',
  },
  count: {
    margin: '0 0 0 4px',
  },
}));

export type TListCategoryClasses =
  | 'accordion'
  | 'accordionExpanded'
  | 'accordionSummary'
  | 'accordionSummaryExpanded'
  | 'accordionSummaryExpandIcon'
  | 'accordionSummaryContent'
  | 'accordionDetails'
  | 'count';

export default useStyles;
