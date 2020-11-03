import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TCustomDrawerClasses>(
  (theme: Theme) => ({
    header: {
      width: '448px',
      padding: '20px 24px',
    },
    close: {
      color: '#2a2935',
    },
    content: {
      width: '448px',
      padding: '20px 24px',
      flexGrow: 1,
      overflowY: 'auto',
    },
    itemName: {
      fontSize: '16px',
    },
    item: {
      padding: '2px 0',
      marginLeft: '-9px',
    },
    title: {
      color: '#2a2935',
      fontSize: '18px',
      fontWeight: 500,
    },
    buttons: {
      width: 'auto',
    },
    cancel: {
      marginRight: '8px',
    },
    footer: {
      padding: '24px',
      background: '#f2f2f2',
    },
    accordion: {
      padding: 0,
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
    },
    accordionSummaryExpanded: {
      minHeight: '0 !important',
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
  }),
);

export type TCustomDrawerClasses =
  | 'header'
  | 'close'
  | 'title'
  | 'item'
  | 'cancel'
  | 'footer'
  | 'buttons'
  | 'itemName'
  | 'accordion'
  | 'accordionExpanded'
  | 'accordionSummary'
  | 'accordionSummaryExpanded'
  | 'accordionSummaryContent'
  | 'accordionDetails'
  | 'count'
  | 'content';

export default useStyles;
