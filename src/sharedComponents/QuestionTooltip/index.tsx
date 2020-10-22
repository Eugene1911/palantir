import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import useStyles from './useStyles';

interface IQuestionTooltipProps {
  title: string;
}

function QuestionTooltip({
  title,
}: IQuestionTooltipProps): JSX.Element {
  const classes = useStyles({});

  return (
    <Tooltip
      classes={{ tooltip: classes.tooltip }}
      title={title}
      placement="right"
      arrow
    >
      <IconButton className={classes.button} component="span">
        <HelpIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}

export default QuestionTooltip;
