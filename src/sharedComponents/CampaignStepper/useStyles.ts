import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TCampaignStepperClasses>(() => ({
  root: {
    padding: 0,
  },
  label: {
    fontSize: '14px',
  },
  icon: {
    fontSize: '12px',
  },
  iconContainer: {
    transform: 'scale(1.3)',
    paddingLeft: '4px',
  },
  editIcon: {
    color: '#fff',
  },
  subLabel: {
    color: '#95959a',
  },
}));

export type TCampaignStepperClasses =
  | 'root'
  | 'label'
  | 'icon'
  | 'iconContainer'
  | 'editIcon'
  | 'subLabel';

export default useStyles;
