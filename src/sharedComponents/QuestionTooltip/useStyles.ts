import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TQuestionTooltipClasses>({
  button: {
    margin: '6px',
    color: '#cdcdcd',
    padding: '1px',
  },
  icon: {
    width: '14px',
    height: '14px',
  },
  tooltip: {
    fontSize: '12px',
    whiteSpace: 'pre-wrap',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  arrow: {
    color: 'rgba(0, 0, 0, 0.7)',
  },
});

export type TQuestionTooltipClasses =
  | 'button'
  | 'icon'
  | 'tooltip'
  | 'arrow';

export default useStyles;
