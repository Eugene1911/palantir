import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import useStyles from './useStyles';

type TQuestionTooltipProps = {
  title: string;
};

function QuestionTooltip({
  title,
}: TQuestionTooltipProps): JSX.Element {
  const classes = useStyles({});

  return (
    <Tooltip title={title} placement="right" arrow>
      <IconButton
        className={classes.button}
        size="small"
        color="default"
        component="span"
      >
        <HelpIcon />
      </IconButton>
    </Tooltip>
  );
}

export default QuestionTooltip;
