import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TWeightClasses>(() => ({
  input: {
    textAlign: 'end',
    fontSize: '16px',
    // убирает стрелочки вверх/вниз у инпута с type = number
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
  inputWrapper: {
    marginLeft: '20px',
  },
}));

export type TWeightClasses = 'input' | 'inputWrapper';

export default useStyles;
