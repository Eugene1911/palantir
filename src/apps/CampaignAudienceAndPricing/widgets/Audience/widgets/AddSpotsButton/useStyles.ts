import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TAddSpotsButtonClasses>({
  paper: {
    marginTop: '50px',
  },
});

export type TAddSpotsButtonClasses = 'paper';

export default useStyles;
