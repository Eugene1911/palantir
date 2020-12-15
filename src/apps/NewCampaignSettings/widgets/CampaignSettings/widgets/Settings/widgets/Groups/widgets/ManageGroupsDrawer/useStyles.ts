import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TManageGroupsDrawerClasses>(
  () => ({
    content: {
      width: '448px',
      padding: '0 0 20px 0',
      flexGrow: 1,
      overflowY: 'auto',
      marginTop: '-4px',
    },
    button: {
      fontSize: '14px',
    },
    loadButton: {
      fontSize: '14px',
      marginTop: '32px',
    },
  }),
);

export type TManageGroupsDrawerClasses =
  | 'content'
  | 'button'
  | 'loadButton';

export default useStyles;
