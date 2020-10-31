import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TCategoriesListClasses>(() => ({
  categoriesList: {
    width: '90%',
  },
}));

export type TCategoriesListClasses = 'categoriesList';

export default useStyles;
