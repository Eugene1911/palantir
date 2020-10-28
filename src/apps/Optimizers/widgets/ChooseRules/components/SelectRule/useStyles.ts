import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TSelectRuleClasses>(() => ({
  icon: {
    verticalAlign: 'middle',
    margin: '0 5px 0 0',
  },
  condition: {
    paddingRight: '7px',
  },
  oprator: {
    textAlign: 'center',
    paddingRight: '15px',
    '& span': {
      verticalAlign: 'middle',
    },
  },
  checkbox: {
    marginTop: '-1px',
  },
}));

export type TSelectRuleClasses =
  | 'icon'
  | 'condition'
  | 'oprator'
  | 'checkbox';

export default useStyles;
