import { Instance, types } from 'mobx-state-tree';
import {
  EListType,
  ETrafficType,
  ETagStatus,
} from '../assets/constants/commonAudienceTypes';

const mockSiteTags = [
  {
    id: 1,
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: 25,
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: 345,
    status: ETagStatus.DISABLED,
  },
];

export const InitialAudienceModel = {
  trafficType: ETrafficType.RON,
  siteID: {
    listType: EListType.WHITE,
    tagsSelected: [],
    tags: mockSiteTags,
  },
};

// const ID = types.model({
//   id: types.number,
// });

const Tag = types.model({
  id: types.number,
  status: types.optional(
    types.enumeration<ETagStatus>(Object.values(ETagStatus)),
    ETagStatus.ACTIVE,
  ),
  tooltip: types.optional(types.string, ''),
});

const AudienceModel = types
  .model({
    trafficType: types.number,
    siteID: types.model('siteID', {
      listType: types.number,
      tags: types.array(Tag),
      tagsSelected: types.array(Tag),
    }),
  })
  .actions(self => ({
    setTrafficType(trafficType: ETrafficType) {
      self.trafficType = trafficType;
    },
    setListType(listType: EListType, model: string) {
      self[model].listType = listType;
    },
    setTagsSelected(tagsSelected, model: string) {
      self[model].tagsSelected = tagsSelected;
    },
    closeTag(tag, model: string) {
      self[model].tags = self.siteID.tags.splice(
        self.siteID.tags.indexOf(tag),
        1,
      );
    },
  }));

export type TAudienceModel = Instance<typeof AudienceModel>;

export default AudienceModel;
