import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TQuestionTooltipClasses>({
  tooltip: {
    fontSize: '12px',
    whiteSpace: 'pre-wrap',
    textAlign: 'center',
  },
});

export type TQuestionTooltipClasses = 'tooltip';

export default useStyles;
