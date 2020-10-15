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
      '&-content-table td:first-child, &-content-table th:first-child': {
        paddingLeft: '16px !important',
      },
      '&-form-label-small': {
        fontSize: '0.7rem !important',
      },
    },
  },
});

export default useGlobalStyles;
