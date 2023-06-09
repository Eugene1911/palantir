import { cast, flow, types } from 'mobx-state-tree';
import {
  AllCustomStatus,
  INotification,
  LoadingStatus,
} from 'sharedTypes';
import { AxiosResponse } from 'axios';
import { errorsString } from '../../../../constants/strings';

const BaseItemModel = types.model({
  code: types.optional(types.string, ''),
  id: types.number,
  name: types.string,
  type: types.optional(types.number, 0),
  // eslint-disable-next-line @typescript-eslint/camelcase
  native_name: types.optional(types.string, ''),
  selected: types.boolean,
  tempSelected: types.boolean,
});

const BaseTagsAndFilterModel = types
  .model({
    radio: types.enumeration<AllCustomStatus>(
      Object.values(AllCustomStatus),
    ),
    list: types.array(BaseItemModel),
    listStatus: types.enumeration<LoadingStatus>(
      Object.values(LoadingStatus),
    ),
    errorWord: types.string,
    editSelectedId: types.array(types.number),
  })
  .views(self => ({
    get selectedCount(): number {
      return self.list.filter(item => item.tempSelected).length;
    },
  }))
  .actions(self => ({
    setRadio(radio: AllCustomStatus): void {
      self.radio = radio;
    },
    selectAllTags(value: boolean): void {
      self.list.forEach(item => {
        item.tempSelected = value;
      });
    },
    setSelected(id: number, value: boolean): void {
      const itemIndex = self.list.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        self.list[itemIndex].tempSelected = value;
      }
    },
    deleteSelected(id: number): void {
      const itemIndex = self.list.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        self.list[itemIndex].selected = false;
        self.list[itemIndex].tempSelected = false;
      }
    },
    saveSelected(): void {
      self.list.forEach(item => {
        item.selected = item.tempSelected;
      });
    },
    cancelSelected(): void {
      self.list.forEach(item => {
        item.tempSelected = item.selected;
      });
    },
    getList: flow(function* getList(
      infoNotification: (arg: INotification) => void,
      getAction: (params: object) => Promise<AxiosResponse>,
    ) {
      self.listStatus = LoadingStatus.LOADING;
      try {
        const { data } = yield getAction({});
        self.listStatus = LoadingStatus.SUCCESS;
        self.list = cast(
          data.map(item => ({
            ...item,
            selected: self.editSelectedId.includes(item.id),
            tempSelected: self.editSelectedId.includes(item.id),
          })),
        );
      } catch (error) {
        self.listStatus = LoadingStatus.ERROR;
        const message =
          error?.response?.data?.msg ||
          errorsString.getList(self.errorWord);

        infoNotification({
          variant: 'error',
          message,
        });
      }
    }),
    getResultData(): number[] {
      if (self.radio === AllCustomStatus.ALL) {
        return [];
      }
      return self.list
        .filter(item => item.selected)
        .map(item => item.id);
    },
  }));

export default BaseTagsAndFilterModel;
