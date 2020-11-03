import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TDevicesClasses>(() => ({
  formControl: {
    marginTop: '12px',
  },
  checkbox: {
    marginRight: '24px',
  },
}));

export type TDevicesClasses = 'formControl' | 'checkbox';

export default useStyles;
