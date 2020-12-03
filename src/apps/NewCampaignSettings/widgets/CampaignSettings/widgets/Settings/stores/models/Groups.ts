import { cast, flow, Instance, types } from 'mobx-state-tree';
import { INotification, LoadingStatus } from 'sharedTypes';
import { getGroups } from 'resources/api';
import { IFullCampaignType } from 'sharedTypes/fullCampaignType';

const GroupModel = types.model({
  id: types.number,
  name: types.string,
});

export const InitialGroupsModel = {
  groupList: [],
  groupListStatus: LoadingStatus.INITIAL,
};

const GroupsModel = types
  .model({
    group: types.maybe(types.number),
    groupList: types.array(GroupModel),
    groupListStatus: types.enumeration<LoadingStatus>(
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
        const { data } = yield getGroups({});
        const list = data.response;

        self.groupList = cast(
          list.map(group => ({
            id: group.id,
            name: group.name,
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
