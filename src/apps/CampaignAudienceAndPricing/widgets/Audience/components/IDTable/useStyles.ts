import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TIDTableClasses>({
  noBorderCell: {
    border: 'none',
  },
  disabledCell: {
    opacity: 0.12,
  },
});

export type TIDTableClasses = 'disabledCell' | 'noBorderCell';

export default useStyles;
