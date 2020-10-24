import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TFlatDealClasses>(
  (theme: Theme) => ({
    container: {
      marginTop: '30px',
    },
    textField: {
      marginRight: '24px',
    },
    deleteIconWrapper: {
      position: 'absolute',
      right: 0,
    },
    deleteIcon: {
      color: '#cdcdcd',
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    input: {
      // убирает стрелочки вверх/вниз у инпута с type = number
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
    },
  }),
);

export type TFlatDealClasses =
  | 'container'
  | 'textField'
  | 'deleteIcon'
  | 'deleteIconWrapper'
  | 'input';

export default useStyles;
