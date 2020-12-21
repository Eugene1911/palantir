import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TDevicesClasses>(
  (theme: Theme) => ({
    formControl: {
      marginTop: '12px',
    },
    checkbox: {
      marginRight: '24px',
    },
    icon: {
      '& svg': {
        width: '24px',
        height: '24px',
      },
      color: '#cdcdcd',
    },
    label: {
      fontWeight: 500,
      letterSpacing: '0.5px',
      color: 'rgba(42, 42, 53, 0.7)',
    },
    activeLabel: {
      fontWeight: 500,
      letterSpacing: '0.5px',
      color: theme.palette.primary.main,
    },
  }),
);

export type TDevicesClasses =
  | 'formControl'
  | 'checkbox'
  | 'icon'
  | 'label'
  | 'activeLabel';

export default useStyles;
