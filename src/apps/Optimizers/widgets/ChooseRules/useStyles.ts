import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TChooseRulesClasses>(theme => ({
  list: {
    height: '100%',
    overflow: 'auto',
  },
  nestedText: {
    paddingLeft: 0,
    color: theme.palette.text.hint,
  },
  nestedRules: {
    color: theme.palette.text.primary,
  },
  nestedIcon: {
    verticalAlign: 'middle',
    margin: '0 5px 0 0',
  },
  nestedCondition: {
    paddingRight: '7px',
  },
  nestedOprator: {
    textAlign: 'center',
    paddingRight: '15px',
    '& span': {
      verticalAlign: 'middle',
    },
  },
  nestedCheckbox: {
    marginTop: '-1px',
  },
  uncheckAllButton: {
    marginRight: '-6px',
  },
}));

export type TChooseRulesClasses =
  | 'list'
  | 'nestedText'
  | 'nestedRules'
  | 'nestedIcon'
  | 'uncheckAllButton'
  | 'nestedCondition'
  | 'nestedOprator'
  | 'nestedCheckbox';

export default useStyles;
