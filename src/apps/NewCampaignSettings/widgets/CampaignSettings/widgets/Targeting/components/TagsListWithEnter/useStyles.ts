import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TTagsListWithEnterClasses>(
  () => ({
    button: {
      fontSize: '14px',
      marginLeft: '20px',
    },
    container: {
      marginBottom: '8px',
    },
  }),
);

export type TTagsListWithEnterClasses = 'button' | 'container';

export default useStyles;
