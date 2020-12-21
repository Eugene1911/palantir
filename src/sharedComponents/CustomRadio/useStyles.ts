import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TCustomRadioClasses>({
  root: {
    '& svg:first-child': {
      transform: 'scale(1)',
    },
    flex: 'none',
    color: '#cdcdcd',
  },
});

export type TCustomRadioClasses = 'root';

export default useStyles;
