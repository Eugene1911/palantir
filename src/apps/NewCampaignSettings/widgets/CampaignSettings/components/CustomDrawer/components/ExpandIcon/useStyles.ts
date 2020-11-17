import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TExpandIconClasses>(() => ({
  filledIcon: {
    background: '#e7e8f7',
  },
  icon: {
    background: 'transparent',
  },
}));

export type TExpandIconClasses = 'filledIcon' | 'icon';

export default useStyles;
