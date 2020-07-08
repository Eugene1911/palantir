import makeStyles from '@material-ui/core/styles/makeStyles';

const useGlobalStyles = makeStyles({
  '@global': {
    '.global': {
      '&-first-character-uppercase': {
        textTransform: 'capitalize',
      },
      '&-table-responsive': {
        overflowX: 'auto',
      },
      '&-text-align-right': {
        textAlign: 'right',
      },
    },
  },
});

export default useGlobalStyles;
