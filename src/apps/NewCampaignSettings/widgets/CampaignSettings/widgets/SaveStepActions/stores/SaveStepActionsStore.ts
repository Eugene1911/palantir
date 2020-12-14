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
      successCallback: (id: number) => void,
      edit: TEditStore,
    ) {
      self.savingStatus = LoadingStatus.LOADING;
      const editAction = edit.isEditDraft
        ? editCampaignAsDraft
        : editCampaign;
      const saveAction = edit.isEdit
        ? (): Promise<AxiosResponse> =>
            editAction(edit.campaignId, resultData)
        : (): Promise<AxiosResponse> =>
            saveCampaignAsDraft(resultData);
      try {
        const { data } = yield saveAction();

        successCallback(data.id);
        self.savingStatus = LoadingStatus.SUCCESS;

        infoNotification({
          variant: 'success',
          message: 'Campaign successfully saved',
        });
      } catch (error) {
        self.savingStatus = LoadingStatus.ERROR;
        const message =
          error?.response?.data?.msg || 'Saving campaign error';

        infoNotification({
          variant: 'error',
          message,
        });
      }
    }),
  }));

export type TSaveStepActionModel = Instance<
  typeof SaveStepActionModel
>;

export default SaveStepActionModel;
