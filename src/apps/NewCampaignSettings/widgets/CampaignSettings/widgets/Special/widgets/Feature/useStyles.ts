import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TFeatureClasses>(() => ({
  switch: {
    marginRight: '60px',
  },
}));

export type TFeatureClasses = 'switch';

export default useStyles;
