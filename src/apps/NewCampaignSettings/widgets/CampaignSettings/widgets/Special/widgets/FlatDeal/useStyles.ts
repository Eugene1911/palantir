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
}));

export type TFlatDealClasses = 'container' | 'textField' | 'input';

export default useStyles;
