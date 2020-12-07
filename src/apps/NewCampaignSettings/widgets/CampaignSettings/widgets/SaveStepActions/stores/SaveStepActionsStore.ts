import { flow, Instance, types } from 'mobx-state-tree';
import { AxiosResponse } from 'axios';
import { INotification, LoadingStatus } from 'sharedTypes';
import {
  saveCampaignAsDraft,
  editCampaignAsDraft,
  editCampaign,
} from 'resources/api';
import { INewCampaignSettingsResultData } from '../../../../../types/resultTypes';
import { TEditStore } from '../../../stores/EditStore';

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
      edit: TEditStore,
    ) {
      self.savingStatus = LoadingStatus.LOADING;
      // TODO потом получать тут id для редиректа и выполнять successCallback
      const editAction = edit.isEditDraft
        ? editCampaignAsDraft
        : editCampaign;
      const saveAction = edit.isEdit
        ? (): Promise<AxiosResponse> =>
            editAction(edit.campaignId, resultData)
        : (): Promise<AxiosResponse> =>
            saveCampaignAsDraft(resultData);
      try {
        yield saveAction();

        // successCallback();
        self.savingStatus = LoadingStatus.SUCCESS;

        infoNotification({
          variant: 'success',
          message: 'Campaign successfully saved',
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
