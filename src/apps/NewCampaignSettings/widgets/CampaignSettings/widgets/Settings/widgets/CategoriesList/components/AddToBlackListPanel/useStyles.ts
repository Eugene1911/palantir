import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TAddToBlackListPanelClasses>(
  () => ({
    container: {
      width: '100%',
      padding: '24px',
      background: '#ffe7eb',
      boxShadow: 'inset 0 1px 0 0 #f2f2f2',
      position: 'fixed',
      right: 0,
      left: 0,
      bottom: 0,
      zIndex: 10,
    },
    buttons: {
      width: 'auto',
    },
    cancel: {
      marginRight: '8px',
    },
  }),
);

export type TAddToBlackListPanelClasses =
  | 'container'
  | 'buttons'
  | 'cancel';

export default useStyles;
