import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import DragHandleIcon from '@material-ui/icons/DragHandle';

const conditions = {
  '<': {
    name: 'Less then',
    icon: NavigateBeforeIcon,
  },
  '>': {
    name: 'More then',
    icon: NavigateNextIcon,
  },
  '=': {
    name: 'More then',
    icon: DragHandleIcon,
  },
};

export default conditions;
