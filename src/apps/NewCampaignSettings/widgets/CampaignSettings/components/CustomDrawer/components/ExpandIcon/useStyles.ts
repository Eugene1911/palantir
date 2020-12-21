import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TExpandIconClasses>(() => ({
  filledIcon: {
    background: '#e7e8f7',
  },
  icon: {
    background: 'transparent',
  },
  chevron: {
    color: '#2a2a34',
  },
}));

export type TExpandIconClasses = 'filledIcon' | 'icon' | 'chevron';

export default useStyles;
