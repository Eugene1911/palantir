import { cast, Instance, types } from 'mobx-state-tree';
import textToArrayWithCheck from 'helpers/textToArrayWithCheck';
import { AllIncludeExclude } from '../../constants/allIncludeExclude';

const BaseTagsAndEnterModel = types
  .model({
    radio: types.enumeration<AllIncludeExclude>(
      Object.values(AllIncludeExclude),
    ),
    list: types.array(types.string),
    excludeList: types.array(types.string),
  })
  .views(self => ({
    get tagsCount(): number {
      return self.radio === AllIncludeExclude.INCLUDE
        ? self.list.length
        : self.excludeList.length;
    },
  }))
  .actions(self => ({
    setRadio(radio: AllIncludeExclude): void {
      self.radio = radio;
    },
    setTags(text: string): void {
      if (self.radio === AllIncludeExclude.INCLUDE) {
        const tagsArray = textToArrayWithCheck(text, self.list);
        if (tagsArray) {
          self.list = cast([...self.list, ...tagsArray]);
        }
      } else {
        const tagsArray = textToArrayWithCheck(
          text,
          self.excludeList,
        );
        if (tagsArray) {
          self.excludeList = cast([
            ...self.excludeList,
            ...tagsArray,
          ]);
        }
      }
    },
    deleteTag(text: string): void {
      if (self.radio === AllIncludeExclude.INCLUDE) {
        const tagIndex = self.list.indexOf(text);
        if (tagIndex !== -1) {
          self.list = cast(
            self.list.filter((item, i) => i !== tagIndex),
          );
        }
      } else {
        const tagIndex = self.excludeList.indexOf(text);
        if (tagIndex !== -1) {
          self.excludeList = cast(
            self.excludeList.filter((item, i) => i !== tagIndex),
          );
        }
      }
    },
    clearAll(): void {
      if (self.radio === AllIncludeExclude.INCLUDE) {
        self.list = cast([]);
      } else {
        self.excludeList = cast([]);
      }
    },
  }));

export type TBaseTagsAndEnterModel = Instance<
  typeof BaseTagsAndEnterModel
>;

export default BaseTagsAndEnterModel;
