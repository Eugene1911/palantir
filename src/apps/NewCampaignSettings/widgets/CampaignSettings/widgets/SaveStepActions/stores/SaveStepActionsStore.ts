import { flow, Instance, types } from 'mobx-state-tree';
import { AxiosResponse } from 'axios';
import { INotification, LoadingStatus } from 'sharedTypes';
import {
  saveCampaignAsDraft,
  editCampaignAsDraft,
  editCampaign,
  createNotes,
} from 'resources/api';
import { INewCampaignSettingsResultData } from '../../../../../types/resultTypes';
import { TEditStore } from '../../../stores/EditStore';
import { errorsString } from '../../../constants/strings';

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
      notes: string,
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
        yield createNotes(data.id, { text: notes });

        successCallback(data.id);
        self.savingStatus = LoadingStatus.SUCCESS;

        infoNotification({
          variant: 'success',
          message: 'Campaign successfully saved',
        });
      } catch (error) {
        self.savingStatus = LoadingStatus.ERROR;
        const message =
          error?.response?.data?.msg || errorsString.saveCampaign;

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
