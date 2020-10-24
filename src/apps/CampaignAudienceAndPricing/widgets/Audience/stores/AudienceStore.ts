import { Instance, types } from 'mobx-state-tree';
import {
  EListType,
  ETrafficType,
} from '../assets/constants/commonAudienceTypes';

const mockSiteTags = [
  {
    id: 1,
    status: 'active',
  },
  {
    id: 25,
    status: 'active',
  },
  {
    id: 345,
    status: 'active',
  },
];

export const InitialAudienceModel = {
  trafficType: ETrafficType.RON,
  siteId: {
    listType: EListType.WHITE,
    sitesSelected: [{ id: 1 }],
    tags: mockSiteTags,
  },
};

const ID = types.model({
  id: types.number,
});

const Tag = types.model({
  id: types.number,
  status: types.optional(types.string, ''),
});

const AudienceModel = types
  .model({
    trafficType: types.number,
    siteId: types.model('SiteId', {
      listType: types.number,
      sitesSelected: types.array(ID),
      tags: types.array(Tag),
    }),
  })
  .actions(self => ({
    setTrafficType(trafficType: ETrafficType) {
      self.trafficType = trafficType;
    },
    setSiteListType(listType: EListType) {
      self.siteId.listType = listType;
    },
    setSitesSelected(sitesSelected) {
      self.siteId.sitesSelected = sitesSelected;
    },
  }));

export type TAudienceModel = Instance<typeof AudienceModel>;

export default AudienceModel;
