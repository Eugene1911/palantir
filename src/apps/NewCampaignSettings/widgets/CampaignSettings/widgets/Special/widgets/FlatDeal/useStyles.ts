import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TFlatDealClasses>(() => ({
  container: {
    marginTop: '30px',
  },
  textField: {
    marginRight: '24px',
  },
  input: {
    // убирает стрелочки вверх/вниз у инпута с type = number
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
  underline: {
    '&::before': {
      borderBottomStyle: 'solid !important',
      opacity: 0.5,
    },
  },
  inputRoot: {
    '& svg': {
      visibility: 'hidden',
    },
    '&:hover': {
      '& svg': {
        visibility: 'visible',
      },
    },
  },
  inputFocused: {
    '& svg': {
      visibility: 'visible',
    },
  },
}));

export type TFlatDealClasses =
  | 'container'
  | 'textField'
  | 'inputRoot'
  | 'inputFocused'
  | 'input'
  | 'underline';

export default useStyles;
