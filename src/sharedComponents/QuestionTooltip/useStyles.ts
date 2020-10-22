import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TQuestionTooltipClasses>({
  button: {
    margin: '0 6px',
    color: '#cdcdcd',
    padding: '1px 0',
  },
  icon: {
    width: '14px',
    height: '14px',
  },
  tooltip: {
    fontSize: '12px',
  },
});

export type TQuestionTooltipClasses = 'button' | 'icon' | 'tooltip';

export default useStyles;
