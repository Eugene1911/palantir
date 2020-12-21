import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TCustomFormControlLabelClasses>(
  theme => ({
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

export type TCustomFormControlLabelClasses = 'label' | 'activeLabel';

export default useStyles;
