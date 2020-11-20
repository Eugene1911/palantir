import { flow, Instance, types } from 'mobx-state-tree';
import { INotification, LoadingStatus } from 'sharedTypes';
import { saveCampaignAsDraft } from 'resources/api';
import { INewCampaignSettingsResultData } from '../../../../../types/resultTypes';

export const InitialSaveStepActionModel = {
  savingStatus: LoadingStatus.INITIAL,
};

const SaveStepActionModel = types
  .model({
    savingStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus),
    ),
  })
  .actions(self => ({
    saveCampaign: flow(function* saveCampaign(
      infoNotification: (arg: INotification) => void,
      resultData: INewCampaignSettingsResultData,
      successCallback: () => void,
    ) {
      self.savingStatus = LoadingStatus.LOADING;
      try {
        // TODO потом получать тут id для редиректа и выполнять successCallback
        yield saveCampaignAsDraft(resultData);

        // successCallback();
        self.savingStatus = LoadingStatus.SUCCESS;

        infoNotification({
          variant: 'success',
          message: 'Campaign successfully saved as draft',
        });
      } catch (error) {
        self.savingStatus = LoadingStatus.ERROR;

        infoNotification({
          variant: 'error',
          message: 'Saving campaign error',
        });
      }
    }),
  }));

export type TSaveStepActionModel = Instance<
  typeof SaveStepActionModel
>;

export default SaveStepActionModel;
