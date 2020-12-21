import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TCustomChipClasses>(
  (theme: Theme) => ({
    default: {
      margin: '8px 8px 0 0',
      fontSize: '14px',
      color: 'rgba(42, 42, 52, 0.7)',
      border: 'solid 1px rgba(42, 42, 52, 0.12)',
    },
    active: {
      margin: '8px 8px 0 0',
      fontSize: '14px',
      color: theme.palette.primary.main,
      border: 'solid 1px #e7e8f7',
      background: '#e7e8f7',
      '&:focus': {
        backgroundColor: '#e7e8f7 !important',
      },
    },
    error: {
      margin: '8px 8px 0 0',
      fontSize: '14px',
      color: '#ff103e',
      border: 'solid 1px #ffe7ec',
      background: '#ffe7ec',
      '&:focus': {
        backgroundColor: '#ffe7ec !important',
      },
    },
    small: {
      height: '20px',
    },
    deleteIcon: {
      opacity: 0.27,
      color: '#030969',
    },
  }),
);

export type TCustomChipClasses =
  | 'default'
  | 'active'
  | 'error'
  | 'deleteIcon'
  | 'small';

export default useStyles;
