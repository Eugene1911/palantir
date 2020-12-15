import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TCampaignFormLabelClasses>(
  () => ({
    root: {
      fontSize: '16px',
    },
    inputMargin: {
      margin: '11px 0',
    },
    radioMargin: {
      margin: '8px 0',
    },
    sliderMargin: {
      margin: '3px 0',
    },
  }),
);

export type TCampaignFormLabelClasses =
  | 'root'
  | 'inputMargin'
  | 'sliderMargin'
  | 'radioMargin';

export default useStyles;
