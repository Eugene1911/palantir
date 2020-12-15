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
  getGroup,
} from 'resources/api';
import { IFullCampaignType } from 'sharedTypes/fullCampaignType';
import { GLOBAL_NAME } from 'config/constants';
import { getCampaignDotStatus } from '../../services/getCampaignDotStatus';

const CampaignModel = types.model({
  id: types.number,
  name: types.string,
  status: types.string,
  dotColor: types.string,
  statusText: types.string,
  type: types.string,
  formatId: types.number,
  formatName: types.maybe(types.string),
});

export type TCampaignModel = Instance<typeof CampaignModel>;

const GroupModel = types.model({
  id: types.number,
  name: types.string,
  isEmpty: types.boolean,
  list: types.array(CampaignModel),
  currentPage: types.number,
  pagesCount: types.number,
  campaignsCount: types.number,
});

export type TGroupModel = Instance<typeof GroupModel>;

export const InitialGroupsModel = {
  groupList: [],
  groupListStatus: LoadingStatus.INITIAL,
  groupActionStatus: LoadingStatus.INITIAL,
  currentPage: 1,
  pagesCount: 1,
  searchGroupList: [],
  searchGroupListStatus: LoadingStatus.INITIAL,
};

const GroupsModel = types
  .model({
    group: types.maybe(GroupModel),
    groupList: types.array(GroupModel),
    groupListStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus),
    ),
    groupActionStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus),
    ),
    currentPage: types.number,
    pagesCount: types.number,
    searchGroupList: types.array(GroupModel),
    searchGroupListStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus),
    ),
  })
  .actions(self => ({
    setGroup(group: TGroupModel): void {
      self.group = group ? cloneDeep(group) : undefined;
    },
    getAccordionText(): string {
      return self.group?.name || '';
    },
    setGroupById: flow(function* setGroupById(groupId: number) {
      try {
        const { data } = yield getGroup(groupId, {});
        self.group = cast({
          id: data.id,
          name: data.name,
          isEmpty: false,
          list: [],
          currentPage: 1,
          pagesCount: 1,
          campaignsCount: 0,
        });
      } catch (error) {
        self.group = undefined;
      }
    }),
    getGroupList: flow(function* getGroupList(
      infoNotification: (arg: INotification) => void,
    ) {
      self.groupListStatus = LoadingStatus.LOADING;
      try {
        const { data } = yield getGroups({
          // eslint-disable-next-line @typescript-eslint/camelcase
          user_id: window[GLOBAL_NAME].user_id,
          page: self.currentPage,
        });

        self.pagesCount = data.page_count;
        const list = data.response;

        self.groupList.push(
          ...list.map(group => ({
            id: group.id,
            name: group.name,
            isEmpty: false,
            list: [],
            currentPage: 1,
            pagesCount: 1,
            campaignsCount: 0,
          })),
        );
        self.groupListStatus = LoadingStatus.SUCCESS;
      } catch (error) {
        self.groupListStatus = LoadingStatus.ERROR;
        const message =
          error?.response?.data?.msg || 'Groups loading error';

        infoNotification({
          variant: 'error',
          message,
        });
      }
    }),
    searchGroupByName: flow(function* searchGroupByName(
      infoNotification: (arg: INotification) => void,
      name: string,
    ) {
      if (name) {
        self.searchGroupListStatus = LoadingStatus.LOADING;
        try {
          const { data } = yield getGroups({
            // eslint-disable-next-line @typescript-eslint/camelcase
            user_id: window[GLOBAL_NAME].user_id,
            name,
          });
          const list = data.response;

          self.searchGroupList = cast(
            list.map(group => ({
              id: group.id,
              name: group.name,
              isEmpty: false,
              list: [],
              currentPage: 1,
              pagesCount: 1,
              campaignsCount: 0,
            })),
          );
          self.searchGroupListStatus = LoadingStatus.SUCCESS;
        } catch (error) {
          self.searchGroupListStatus = LoadingStatus.ERROR;
          const message =
            error?.response?.data?.msg || 'Groups loading error';

          infoNotification({
            variant: 'error',
            message,
          });
        }
      } else {
        self.searchGroupList = cast([]);
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
          currentPage: 1,
          pagesCount: 1,
          campaignsCount: 0,
        });
        self.groupActionStatus = LoadingStatus.SUCCESS;
        successCallback();
      } catch (error) {
        self.groupActionStatus = LoadingStatus.ERROR;
        const message =
          error?.response?.data?.msg || 'Creating group error';

        infoNotification({
          variant: 'error',
          message,
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
                self.groupList[groupIndex].campaignsCount -= 1;
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
            currentPage: self.groupList[groupIndex].currentPage,
            pagesCount: self.groupList[groupIndex].pagesCount,
            campaignsCount: self.groupList[groupIndex].campaignsCount,
          };
        }
        self.groupActionStatus = LoadingStatus.SUCCESS;
        successCallback();
      } catch (error) {
        self.groupActionStatus = LoadingStatus.ERROR;
        const message =
          error?.response?.data?.msg || 'Updating group error';

        infoNotification({
          variant: 'error',
          message,
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
          if (self.group?.id === id) {
            self.group = undefined;
          }
        }
        self.groupActionStatus = LoadingStatus.SUCCESS;
        successCallback();
      } catch (error) {
        self.groupActionStatus = LoadingStatus.ERROR;
        const message =
          error?.response?.data?.msg || 'Deleting group error';

        infoNotification({
          variant: 'error',
          message,
        });
      }
    }),
    getCampaignListByGroup: flow(function* getCampaignListByGroup(
      infoNotification: (arg: INotification) => void,
      groupId: number,
      successCallback: () => void,
      getAdFormatNameById: (id: number) => string | undefined,
    ) {
      try {
        const currentGroup = self.groupList.find(
          group => group.id === groupId,
        );
        const { data } = yield getCampaigns({
          group_id: groupId, // eslint-disable-line @typescript-eslint/camelcase
          page: currentGroup?.currentPage || 1,
        });

        const groupIndex = self.groupList.findIndex(
          group => group.id === groupId,
        );
        if (groupIndex !== -1) {
          if (!data.response.length) {
            self.groupList[groupIndex].isEmpty = true;
          } else {
            self.groupList[groupIndex].pagesCount = data.page_count;
            self.groupList[groupIndex].campaignsCount = data.count;
            self.groupList[groupIndex].list.push(
              ...data.response.map(campaign => {
                const statusObject = getCampaignDotStatus(
                  campaign.status,
                  campaign.active,
                  campaign.no_funds,
                  campaign.is_archived,
                );
                return {
                  ...campaign,
                  formatId: campaign.format_id,
                  formatName: getAdFormatNameById(campaign.format_id),
                  dotColor: statusObject.color,
                  statusText: statusObject.text,
                };
              }),
            );
          }
        }
        successCallback();
      } catch (error) {
        const message =
          error?.response?.data?.msg || 'Get campaign list error';

        infoNotification({
          variant: 'error',
          message,
        });
      }
    }),
  }))
  .actions(self => ({
    setEditData(data: IFullCampaignType): void {
      if (data.group_id) {
        self.setGroupById(data.group_id);
      }
    },
  }))
  .actions(self => ({
    loadMoreGroups(
      infoNotification: (arg: INotification) => void,
    ): void {
      if (self.currentPage < self.pagesCount) {
        self.currentPage += 1;
        self.getGroupList(infoNotification);
      }
    },
    loadMoreCampaigns(
      infoNotification: (arg: INotification) => void,
      group: TGroupModel,
      successCallback: () => void,
      getAdFormatNameById: (id: number) => string | undefined,
    ): void {
      if (group.currentPage < group.pagesCount) {
        group.currentPage += 1;
        self.getCampaignListByGroup(
          infoNotification,
          group.id,
          successCallback,
          getAdFormatNameById,
        );
      }
    },
  }));

export type TGroupsModel = Instance<typeof GroupsModel>;

export default GroupsModel;
