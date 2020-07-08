import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TQuestionTooltipClasses>({
  button: {
    display: 'inline-block',
    margin: '0 4px',
  },
});

export type TQuestionTooltipClasses = 'button';

export default useStyles;
