import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TListItemClasses>(() => ({
  item: {
    padding: '2px 0',
    marginLeft: '-9px',
  },
}));

export type TListItemClasses = 'item';

export default useStyles;
