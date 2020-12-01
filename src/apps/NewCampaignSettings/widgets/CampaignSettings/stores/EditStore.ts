import { flow, Instance, types } from 'mobx-state-tree';
import { INotification, LoadingStatus } from 'sharedTypes';
import { IFullCampaignType } from 'sharedTypes/fullCampaignType';
import { getCampaignById } from 'resources/api';
import { IUrlParamsType } from '../../../types/urlParamsType';

export const InitialEditStore = {
  isEdit: false,
  campaignId: null,
  campaignStatus: LoadingStatus.INITIAL,
};

const IS_EDIT_MODE = 'edit';

const EditStore = types
  .model({
    isEdit: types.boolean,
    campaignId: types.maybeNull(types.number),
    campaignStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus),
    ),
  })
  .actions(self => ({
    getCampaignDataById: flow(function* getCampaignDataById(
      infoNotification: (arg: INotification) => void,
      id: number,
      setNewCampaignSettingsEditData: (
        data: IFullCampaignType,
      ) => void,
    ) {
      self.campaignStatus = LoadingStatus.LOADING;
      try {
        const { data } = yield getCampaignById(id);
        self.campaignStatus = LoadingStatus.SUCCESS;
        setNewCampaignSettingsEditData(data);
      } catch (error) {
        self.campaignStatus = LoadingStatus.ERROR;
        infoNotification({
          variant: 'error',
          message: 'Get campaign error',
        });
      }
    }),
  }))
  .actions(self => ({
    fetchCampaignEditData(
      params: IUrlParamsType,
      infoNotification: (arg: INotification) => void,
      setNewCampaignSettingsEditData: (
        data: IFullCampaignType,
      ) => void,
    ): void {
      const id = +params.id;
      self.isEdit = params.mode === IS_EDIT_MODE && !!id;

      if (
        self.isEdit &&
        self.campaignStatus === LoadingStatus.INITIAL
      ) {
        self.campaignId = id;
        self.getCampaignDataById(
          infoNotification,
          id,
          setNewCampaignSettingsEditData,
        );
      }
    },
  }));

export type TEditStore = Instance<typeof EditStore>;

export default EditStore;
