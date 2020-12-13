import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TUpdateGroupDrawerClasses>(
  () => ({
    content: {
      padding: '24px',
      flexGrow: 1,
      overflowY: 'auto',
    },
    button: {
      color: '#ff103e',
    },
    icon: {
      color: '#9b9b9b',
      flex: 'none',
      marginLeft: '16px',
    },
  }),
);

export type TUpdateGroupDrawerClasses = 'content' | 'button' | 'icon';

export default useStyles;
