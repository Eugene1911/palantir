import { flow, Instance, types } from 'mobx-state-tree';
import {
  INotification,
  LoadingStatus,
  IUrlParamsType,
} from 'sharedTypes';
import { IFullCampaignType } from 'sharedTypes/fullCampaignType';
import { getCampaignById } from 'resources/api';
import { CLIENT_STATUSES, DRAFT_STATUS } from 'config/constants';
import { errorsString } from '../constants/strings';

export const InitialEditStore = {
  isEdit: false,
  isEditDraft: false,
  campaignId: null,
  status: DRAFT_STATUS,
  isActive: false,
  isNoFunds: false,
  isArchived: false,
  approved: CLIENT_STATUSES.INACTIVE,
  campaignStatus: LoadingStatus.INITIAL,
};

const IS_EDIT_MODE = 'edit';

const EditStore = types
  .model({
    isEdit: types.boolean,
    isEditDraft: types.boolean,
    campaignId: types.maybeNull(types.number),
    status: types.string,
    isActive: types.boolean,
    isNoFunds: types.boolean,
    isArchived: types.boolean,
    approved: types.string,
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

        self.isEditDraft = data.status === DRAFT_STATUS;
        self.status = data.status;
        self.isActive = data.active;
        self.isArchived = data.is_archived;
        self.isNoFunds = data.no_funds;
        self.approved = data.approved;

        setNewCampaignSettingsEditData(data);
      } catch (error) {
        self.campaignStatus = LoadingStatus.ERROR;
        const message =
          error?.response?.data?.msg || errorsString.getCampaign;

        infoNotification({
          variant: 'error',
          message,
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
