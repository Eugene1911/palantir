import { getCampaignDcpmType } from 'resources/api';
import withFetchingDataLoader from 'sharedWidgets/withFetchingDataLoader';
import { TCommonFetchingDataType } from 'sharedTypes';

export default withFetchingDataLoader<TCommonFetchingDataType>(
  getCampaignDcpmType,
);
