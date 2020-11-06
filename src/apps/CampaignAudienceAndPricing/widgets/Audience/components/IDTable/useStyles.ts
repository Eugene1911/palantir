import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TIDTableClasses>({
  noBorderCell: {
    border: 'none',
  },
  disabledCell: {
    opacity: 0.12,
  },
  headerCell: {
    backgroundColor: 'white',
  },
  padding: {
    padding: '0 24px',
  },
});

export type TIDTableClasses =
  | 'disabledCell'
  | 'noBorderCell'
  | 'headerCell'
  | 'padding';

export default useStyles;
