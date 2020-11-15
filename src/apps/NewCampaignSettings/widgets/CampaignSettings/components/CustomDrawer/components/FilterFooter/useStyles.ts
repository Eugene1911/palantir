import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TFilterFooterClasses>(() => ({
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
}));

export type TFilterFooterClasses = 'cancel' | 'footer' | 'buttons';

export default useStyles;
