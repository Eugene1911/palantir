import { makeStyles } from '@material-ui/styles';
import {
  CAMPAIGNS_STATUSES,
  CLIENT_STATUSES,
} from 'config/constants';

function getStatusColor(status) {
  return makeStyles(theme => {
    const {
      palette: { statuses },
    } = theme;
    let color = null;

    switch (status) {
      case CLIENT_STATUSES.ACTIVE:
      case CAMPAIGNS_STATUSES.ENABLED:
        color = statuses.green;
        break;
      case CAMPAIGNS_STATUSES.PAUSED:
        color = statuses.orange;
        break;
      case CAMPAIGNS_STATUSES.ARCHIVED:
        color = statuses.orangeDark;
        break;
      case CAMPAIGNS_STATUSES.REJECTED:
        color = statuses.blueLight;
        break;
      case CLIENT_STATUSES.FRAUD:
      case CLIENT_STATUSES.INACTIVE:
      case CAMPAIGNS_STATUSES.UNAPPROVED:
        color = statuses.red;
        break;
      case CAMPAIGNS_STATUSES.NO_FUNDS:
        color = statuses.redDark;
        break;
      case CLIENT_STATUSES.PENDING:
        color = statuses.grey;
        break;
      default:
        break;
    }

    return {
      status: {
        borderLeft: `4px solid ${color}`,
      },
    };
  })();
}

export default getStatusColor;
