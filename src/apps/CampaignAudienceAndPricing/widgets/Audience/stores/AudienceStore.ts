import { Instance, types } from 'mobx-state-tree';
import {
  EListType,
  ETrafficType,
  ETagStatus,
} from '../assets/constants/commonAudienceTypes';
import { mockSiteTags, mockSpotTags, mockSubTags } from './mocks';

export const InitialAudienceModel = {
  trafficType: ETrafficType.RON,
  siteID: {
    listType: EListType.WHITE,
    tags: mockSiteTags,
    tagsSelected: mockSiteTags.map(tag => tag.id),
  },
  spotID: {
    listType: EListType.WHITE,
    tags: mockSpotTags,
    tagsSelected: mockSpotTags.map(tag => tag.id),
  },
  subID: {
    listType: EListType.WHITE,
    tags: mockSubTags,
    tagsSelected: mockSubTags.map(tag => tag.id),
  },
};

const Tag = types.model({
  id: types.identifier,
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
      tagsSelected: types.array(types.reference(Tag)),
    }),
    spotID: types.model('spotID', {
      listType: types.number,
      tags: types.array(Tag),
      tagsSelected: types.array(types.reference(Tag)),
    }),
    subID: types.model('subID', {
      listType: types.number,
      tags: types.array(Tag),
      tagsSelected: types.array(types.reference(Tag)),
    }),
  })
  .actions(self => ({
    setTrafficType(trafficType: ETrafficType) {
      self.trafficType = trafficType;
    },
    setListType(listType: EListType, model: string) {
      self[model].listType = listType;
    },
    setTagsSelected(tagsIDSelected, model: string) {
      self[model].tagsSelected = tagsIDSelected;
    },
    closeTag(tagID, model: string) {
      self[model].tagsSelected = self[model].tagsSelected.filter(
        ({ id }) => id !== tagID,
      );
    },
    clearTags(model: string) {
      self[model].tagsSelected = self[model].tags.map(({ id }) => id);
    },
  }));

export type TAudienceModel = Instance<typeof AudienceModel>;

export default AudienceModel;
