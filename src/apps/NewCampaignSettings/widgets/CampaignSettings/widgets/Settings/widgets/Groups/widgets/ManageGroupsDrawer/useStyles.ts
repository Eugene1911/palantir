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
      marginLeft: '15px',
      marginTop: '8px',
      fontSize: '14px',
    },
  }),
);

export type TManageGroupsDrawerClasses = 'content' | 'button';

export default useStyles;
