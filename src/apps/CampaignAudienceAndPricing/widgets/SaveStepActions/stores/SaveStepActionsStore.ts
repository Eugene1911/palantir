import { flow, Instance, types } from 'mobx-state-tree';
import { INotification } from 'sharedTypes';
import { editCampaignAsDraft } from 'resources/api';
import {
  EFetchStatus,
  ICampaignAudienceAndPricingResultData,
} from '../../../assets/commonTypes';

export const InitialSaveStepActionModel = {
  savingStatus: EFetchStatus.NOT_FETCHED,
};

const SaveStepActionModel = types
  .model({
    savingStatus: types.enumeration<EFetchStatus>(
      Object.values(EFetchStatus),
    ),
  })
  .actions(self => ({
    saveCampaign: flow(function* saveCampaign(
      id: number,
      infoNotification: (arg: INotification) => void,
      resultData: ICampaignAudienceAndPricingResultData,
      successCallback: () => void,
    ) {
      self.savingStatus = EFetchStatus.PENDING;
      try {
        yield editCampaignAsDraft(id, resultData);

        successCallback();
        self.savingStatus = EFetchStatus.SUCCESS;

        infoNotification({
          variant: 'success',
          message: 'Campaign successfully saved as draft',
        });
      } catch (error) {
        self.savingStatus = EFetchStatus.ERROR;

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
