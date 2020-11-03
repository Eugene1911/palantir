import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TModelPriceClasses>(() => ({
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
}));

export type TModelPriceClasses = 'textField' | 'input';

export default useStyles;
