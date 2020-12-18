import { makeStyles, Theme } from '@material-ui/core/styles';
import { CLOSED_HEIGHT } from './constants/closedHeight';

const useStyles = makeStyles<Theme, TChipsWithFilterClasses>(() => ({
  button: {
    fontSize: '14px',
    marginTop: '8px',
  },
  editButton: {
    fontSize: '14px',
    position: 'absolute',
    top: '20px',
    right: 0,
  },
  container: {
    marginTop: '16px',
  },
  closedContainer: {
    marginTop: '16px',
    maxHeight: `${CLOSED_HEIGHT}px`,
    overflow: 'hidden',
  },
}));

export type TChipsWithFilterClasses =
  | 'button'
  | 'container'
  | 'closedContainer'
  | 'editButton';

export default useStyles;
