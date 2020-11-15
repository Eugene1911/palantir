import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TListItemNameClasses>(() => ({
  itemName: {
    fontSize: '16px',
  },
  filledItemName: {
    fontSize: '16px',
    background: '#e7e8f7',
  },
}));

export type TListItemNameClasses = 'itemName' | 'filledItemName';

export default useStyles;
