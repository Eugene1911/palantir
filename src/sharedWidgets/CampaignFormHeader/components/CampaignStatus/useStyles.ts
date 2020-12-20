import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme, TCampaignStatusClasses>(
  (theme: Theme) => ({
    status: {
      textTransform: 'uppercase',
      fontSize: '14px',
      fontWeight: 500,
    },
    wrapper: {
      background: '#f9f9f9',
      color: 'rgba(42, 42, 52, 0.5)',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2px 6px',
    },
    active: {
      background: '#e8e9f7',
      color: theme.palette.primary.main,
    },
    rejected: {
      background: '#ffe7eb',
      color: theme.palette.error.main,
    },
    pending: {
      background: '#fef8ef',
      color: '#eab20f',
    },
  }),
);

export type TCampaignStatusClasses =
  | 'status'
  | 'wrapper'
  | 'active'
  | 'pending'
  | 'rejected';

export default useStyles;
