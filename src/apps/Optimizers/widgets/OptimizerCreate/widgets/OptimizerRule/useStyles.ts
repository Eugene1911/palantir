import { makeStyles, Theme } from '@material-ui/core/styles';

type TOptimizerRuleStylesProps = {
  isOpenCondition: boolean;
  isEven: boolean;
};

const useStyles = makeStyles<
  Theme,
  TOptimizerRuleStylesProps,
  TCampaignEditPanelSummaryClasses
>((theme: Theme) => ({
  deleteButton: {
    paddingTop: '5px',
    textAlign: 'right',
  },
  ruleText: {
    color: theme.palette.grey[600],
    paddingTop: '6px',
  },
  ruleWrap: {
    background: (props: TOptimizerRuleStylesProps) =>
      props.isEven ? theme.palette.grey[100] : theme.palette.grey[50],
    padding: '4px 20px 7px 24px',
    marginBottom: '1px',
  },
  ruleCondition: {
    marginTop: '-2px',
  },
  conditionSymbol: {
    color: (props: TOptimizerRuleStylesProps): string =>
      props.isOpenCondition
        ? theme.palette.text.primary
        : theme.palette.grey[400],
    verticalAlign: 'bottom',
    marginBottom: '-2px',
    marginRight: '10px',
  },
}));

export type TCampaignEditPanelSummaryClasses =
  | 'conditionSymbol'
  | 'ruleText'
  | 'ruleWrap'
  | 'ruleCondition'
  | 'deleteButton';

export default useStyles;
