import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TNotesDrawerClasses>(() => ({
  header: {
    width: '448px',
    padding: '20px 24px',
  },
  close: {
    color: '#2a2935',
  },
  title: {
    color: '#2a2935',
    fontSize: '18px',
    fontWeight: 500,
  },
  content: {
    padding: '16px 24px',
    flexGrow: 1,
    width: '400px',
    overflowY: 'auto',
  },
  cancel: {
    marginRight: '8px',
  },
  footer: {
    padding: '24px',
    background: '#f2f2f2',
    '& button': {
      fontSize: '14px',
      textTransform: 'none',
    },
  },
  notes: {
    color: 'rgba(42, 42, 52, 0.7)',
    fontSize: '16px',
    marginBottom: '24px',
  },
}));

export type TNotesDrawerClasses =
  | 'header'
  | 'close'
  | 'title'
  | 'footer'
  | 'cancel'
  | 'notes'
  | 'content';

export default useStyles;
