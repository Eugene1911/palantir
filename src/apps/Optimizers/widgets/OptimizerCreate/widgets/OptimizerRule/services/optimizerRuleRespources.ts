import DragHandleIcon from '@material-ui/icons/DragHandle';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export type TOptimizerRuleCondition = {
  name: string;
  symbol?: Function;
  id: string;
};

export const optimizerRuleCondition: Array<TOptimizerRuleCondition> = [
  {
    name: 'Less then',
    symbol: NavigateBeforeIcon,
    id: '<',
  },
  {
    name: 'More than',
    symbol: NavigateNextIcon,
    id: '>',
  },
  {
    name: 'Equal to',
    symbol: DragHandleIcon,
    id: '=',
  },
];
