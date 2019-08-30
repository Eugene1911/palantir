import { makeStyles } from '@material-ui/styles';
import { CAMPAIGNS_STATUSES } from 'config/constants';

function getStatusColor(status) {
  return makeStyles(theme => {
    const {
      palette: { statuses },
    } = theme;
    let color = null;

    switch (status) {
      case CAMPAIGNS_STATUSES.ENABLED:
        color = statuses.green;
        break;
      case CAMPAIGNS_STATUSES.PAUSED:
      case CAMPAIGNS_STATUSES.ARCHIVED:
        color = statuses.orange;
        break;
      case CAMPAIGNS_STATUSES.REJECTED:
        color = statuses.red;
        break;
      case CAMPAIGNS_STATUSES.UNAPPROVED:
        color = statuses.redDark;
        break;
      case CAMPAIGNS_STATUSES.NO_FUNDS:
        color = statuses.blueLight;
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
