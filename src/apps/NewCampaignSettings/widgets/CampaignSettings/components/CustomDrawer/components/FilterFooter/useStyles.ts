import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TFilterFooterClasses>(() => ({
  buttons: {
    width: 'auto',
    marginLeft: 'auto',
  },
  cancel: {
    marginRight: '8px',
  },
  footer: {
    padding: '24px',
    background: '#f2f2f2',
    '& button': {
      fontSize: '14px',
    },
  },
}));

export type TFilterFooterClasses = 'cancel' | 'footer' | 'buttons';

export default useStyles;
