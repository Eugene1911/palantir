import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TOptimizerGroupClasses>(
  (theme: Theme) => ({
    accordion: {
      boxShadow: 'none',
    },
    deleteGroupWrap: {
      paddingTop: '20px !important',
      whiteSpace: 'nowrap',
    },
    accordionSummary: {
      paddingLeft: 0,
    },
    ruleLabel: {
      paddingBottom: '10px',
    },
    groupLabel: {
      paddingTop: '15px',
    },
    moreIcon: {
      textAlign: 'right',
      paddingTop: '5px',
    },
  }),
);

export type TOptimizerGroupClasses =
  | 'accordion'
  | 'deleteGroupWrap'
  | 'ruleLabel'
  | 'moreIcon'
  | 'groupLabel'
  | 'accordionSummary';

export default useStyles;
