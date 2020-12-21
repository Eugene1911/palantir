import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TDayTimeTableClasses>(
  (theme: Theme) => ({
    headCell: {
      width: '56px',
      height: '40px',
      border: '1px solid transparent',
      padding: '0 16px 0 0',
      userSelect: 'none',
    },
    hour: {
      border: '1px solid rgba(42, 42, 52, 0.2)',
      padding: '2px',
      cursor: 'pointer',
      '&:hover': {
        '& $box': {
          background: 'rgba(19, 28, 170, 0.1)',
        },
        '& $activeBox': {
          background: theme.palette.primary.dark,
        },
      },
    },
    box: {
      width: '32px',
      height: '32px',
      borderRadius: '4px',
      padding: '2px',
      fontSize: '11px',
      fontWeight: 500,
      color: '#d4d4d6',
      userSelect: 'none',
    },
    activeBox: {
      background: theme.palette.primary.main,
      color: 'rgba(255, 255, 255, 0.32)',
    },
    head: {
      width: '56px',
    },
    table: {
      width: 'auto',
    },
  }),
);

export type TDayTimeTableClasses =
  | 'headCell'
  | 'hour'
  | 'box'
  | 'head'
  | 'table'
  | 'activeBox';

export default useStyles;
