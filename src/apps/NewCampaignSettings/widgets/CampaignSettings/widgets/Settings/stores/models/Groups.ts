import { cast, flow, Instance, types } from 'mobx-state-tree';
import { INotification, LoadingStatus } from 'sharedTypes';
import cloneDeep from 'lodash/cloneDeep';
import {
  createGroup,
  deleteGroup,
  getCampaigns,
  getGroups,
  makeBatch,
  updateGroup,
} from 'resources/api';
import { IFullCampaignType } from 'sharedTypes/fullCampaignType';
import { GLOBAL_NAME } from 'config/constants';

const CampaignModel = types.model({
  id: types.number,
  name: types.string,
  status: types.string,
  type: types.string,
});

export type TCampaignModel = Instance<typeof CampaignModel>;

const GroupModel = types.model({
  id: types.number,
  name: types.string,
  isEmpty: types.boolean,
  list: types.array(CampaignModel),
});

export type TGroupModel = Instance<typeof GroupModel>;

export const InitialGroupsModel = {
  groupList: [],
  groupListStatus: LoadingStatus.INITIAL,
  groupActionStatus: LoadingStatus.INITIAL,
};

const GroupsModel = types
  .model({
    group: types.maybe(types.number),
    groupList: types.array(GroupModel),
    groupListStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus),
    ),
    groupActionStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus),
    ),
  })
  .actions(self => ({
    setGroup(group: number): void {
      self.group = group;
    },
    getGroupList: flow(function* getGroupList(
      infoNotification: (arg: INotification) => void,
    ) {
      self.groupListStatus = LoadingStatus.LOADING;
      try {
        const { data } = yield getGroups({
          // eslint-disable-next-line @typescript-eslint/camelcase
          user_id: window[GLOBAL_NAME].user_id,
        });
        const list = data.response;

        self.groupList = cast(
          list.map(group => ({
            id: group.id,
            name: group.name,
            isEmpty: false,
            list: [],
          })),
        );
        self.groupListStatus = LoadingStatus.SUCCESS;
      } catch (error) {
        self.groupListStatus = LoadingStatus.ERROR;

        infoNotification({
          variant: 'error',
          message: 'Groups loading error',
        });
      }
    }),
    createCampaignGroup: flow(function* createCampaignGroup(
      infoNotification: (arg: INotification) => void,
      name: string,
      successCallback: () => void,
    ) {
      self.groupActionStatus = LoadingStatus.LOADING;
      try {
        const { data } = yield createGroup({
          // eslint-disable-next-line @typescript-eslint/camelcase
          user_id: window[GLOBAL_NAME].user_id,
          name,
        });

        self.groupList.push({
          ...data,
          isEmpty: false,
          list: [],
        });
        self.groupActionStatus = LoadingStatus.SUCCESS;
        successCallback();
      } catch (error) {
        self.groupActionStatus = LoadingStatus.ERROR;

        infoNotification({
          variant: 'error',
          message: 'Creating group error',
        });
      }
    }),
    updateCampaignGroup: flow(function* updateCampaignGroup(
      infoNotification: (arg: INotification) => void,
      id: number,
      name: string,
      campaignsIdForDelete: number[],
      successCallback: () => void,
    ) {
      self.groupActionStatus = LoadingStatus.LOADING;
      try {
        const groupIndex = self.groupList.findIndex(
          group => group.id === id,
        );

        if (campaignsIdForDelete.length) {
          const batchData = campaignsIdForDelete.map(campaignId => ({
            path: `/v1.1/campaigns/${campaignId}`,
            method: 'patch',
            body: {
              // eslint-disable-next-line @typescript-eslint/camelcase
              group_id: null,
            },
          }));
          yield makeBatch(batchData);

          if (groupIndex !== -1) {
            campaignsIdForDelete.forEach(campaignId => {
              const campaignIndex = self.groupList[
                groupIndex
              ].list.findIndex(item => item.id === campaignId);

              if (campaignIndex !== -1) {
                self.groupList[groupIndex].list.splice(
                  campaignIndex,
                  1,
                );
              }
            });
          }
        }
        const { data } = yield updateGroup(id, { name });

        if (groupIndex !== -1) {
          self.groupList[groupIndex] = {
            ...data,
            isEmpty: self.groupList[groupIndex].isEmpty,
            list: cloneDeep(self.groupList[groupIndex].list),
          };
        }
        self.groupActionStatus = LoadingStatus.SUCCESS;
        successCallback();
      } catch (error) {
        self.groupActionStatus = LoadingStatus.ERROR;

        infoNotification({
          variant: 'error',
          message: 'Updating group error',
        });
      }
    }),
    deleteCampaignGroup: flow(function* deleteCampaignGroup(
      infoNotification: (arg: INotification) => void,
      id: number,
      successCallback: () => void,
    ) {
      self.groupActionStatus = LoadingStatus.LOADING;
      try {
        yield deleteGroup(id, {});

        const groupIndex = self.groupList.findIndex(
          group => group.id === id,
        );
        if (groupIndex !== -1) {
          self.groupList.splice(groupIndex, 1);
          if (self.group === id) {
            self.group = undefined;
          }
        }
        self.groupActionStatus = LoadingStatus.SUCCESS;
        successCallback();
      } catch (error) {
        self.groupActionStatus = LoadingStatus.ERROR;

        infoNotification({
          variant: 'error',
          message: 'Deleting group error',
        });
      }
    }),
    getCampaignListByGroup: flow(function* getCampaignListByGroup(
      infoNotification: (arg: INotification) => void,
      groupId: number,
      successCallback: () => void,
    ) {
      try {
        const {
          data: { response },
          // eslint-disable-next-line @typescript-eslint/camelcase
        } = yield getCampaigns({ group_id: groupId });

        const groupIndex = self.groupList.findIndex(
          group => group.id === groupId,
        );
        if (groupIndex !== -1) {
          if (!response.length) {
            self.groupList[groupIndex].isEmpty = true;
          } else {
            self.groupList[groupIndex].list = cast(
              response.map(campaign => ({
                ...campaign,
                format: campaign.format_id,
              })),
            );
          }
        }
        successCallback();
      } catch (error) {
        infoNotification({
          variant: 'error',
          message: 'Get campaign list error',
        });
      }
    }),
  }))
  .actions(self => ({
    setEditData(data: IFullCampaignType): void {
      if (data.group_id) {
        self.setGroup(data.group_id);
      }
    },
  }));

export type TGroupsModel = Instance<typeof GroupsModel>;

export default GroupsModel;
