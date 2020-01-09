import makeStyles from '@material-ui/core/styles/makeStyles';

const globalStyles = (): any =>
  makeStyles({
    '@global': {
      '.global': {
        '&-first-character-uppercase': {
          textTransform: 'capitalize',
        },
        '&-table-responsive': {
          overflowX: 'auto',
        },
      },
    },
  });

export default globalStyles;
