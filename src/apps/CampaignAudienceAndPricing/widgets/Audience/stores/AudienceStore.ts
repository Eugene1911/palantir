import { Instance, types, flow } from 'mobx-state-tree';
import { getApplications, getSpots } from 'resources/api';
import {
  EListType,
  ETrafficType,
  ETagStatus,
  EIDModel,
} from '../assets/constants/commonAudienceTypes';
import { mockSubTags } from './mocks';

export const InitialAudienceModel = {
  trafficType: ETrafficType.RON,
  [EIDModel.SITE_ID]: {
    listType: EListType.WHITE,
    // tags: mockSiteTags,
    // tagsSelected: mockSiteTags.map(tag => tag.id),
  },
  [EIDModel.SPOT_ID]: {
    listType: EListType.WHITE,
    // tags: mockSpotTags,
    // tagsSelected: mockSpotTags.map(tag => tag.id),
  },
  [EIDModel.SUB_ID]: {
    listType: EListType.WHITE,
    tags: mockSubTags,
    tagsSelected: mockSubTags.map(tag => tag.id),
  },
  filterSideModel: EIDModel.SITE_ID,
};

const Site = types.model({
  id: types.identifier,
  domain: types.string,
  avg: types.string,
});

const Spot = types.model({
  id: types.identifier,
  siteID: types.string,
  domain: types.string,
  avg: types.string,
  adZone: types.string,
  bid: types.optional(types.number, 0),
  isPrime: types.boolean,
  tooltip: types.string,
});

const Sub = types.model({
  id: types.identifier,
});

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
    [EIDModel.SITE_ID]: types.model(EIDModel.SITE_ID, {
      listType: types.number,
      tags: types.optional(types.array(Tag), []),
      tagsSelected: types.optional(
        types.array(types.reference(Tag)),
        [],
      ),
      sites: types.optional(types.array(Site), []),
    }),
    [EIDModel.SPOT_ID]: types.model(EIDModel.SPOT_ID, {
      listType: types.number,
      tags: types.optional(types.array(Tag), []),
      tagsSelected: types.optional(
        types.array(types.reference(Tag)),
        [],
      ),
      spots: types.optional(types.array(Spot), []),
    }),
    [EIDModel.SUB_ID]: types.model(EIDModel.SUB_ID, {
      listType: types.number,
      tags: types.optional(types.array(Tag), []),
      tagsSelected: types.optional(
        types.array(types.reference(Tag)),
        [],
      ),
      subs: types.optional(types.array(Sub), []),
    }),
    filterSideModel: types.enumeration<EIDModel>(
      Object.values(EIDModel),
    ),
  })
  .actions(self => ({
    setTrafficType(trafficType: ETrafficType) {
      self.trafficType = trafficType;
    },
    setListType(listType: EListType, model: EIDModel) {
      self[model].listType = listType;
    },
    setFilterSideModel(model: EIDModel) {
      self.filterSideModel = model;
    },
    setTags(sourceArr, model: EIDModel) {
      self[model].tags = sourceArr.map(({ id, tooltip, status }) => ({
        id,
        tooltip,
        status,
      }));
    },
    setTagsSelected(tagsIDSelected, model: EIDModel) {
      self[model].tagsSelected = tagsIDSelected;
    },
    closeTag(tagID, model: string) {
      self[model].tagsSelected = self[model].tagsSelected.filter(
        ({ id }) => id !== tagID,
      );
    },
    clearTags(model: string) {
      self[model].tagsSelected = [];
    },
    // запросы
    getSpotsData: flow(function* getSpotsData() {
      try {
        const { data } = yield getSpots({});
        console.log('spots', data.response);
        const spots = data.response.map(spot => {
          const {
            id,
            // eslint-disable-next-line @typescript-eslint/camelcase
            app_id,
            application,
            codename,
            prime,
            name,
          } = spot;

          return {
            id: String(id),
            domain: application?.url || '',
            avg: 'n/a',
            siteID: String(app_id),
            adZone: codename,
            isPrime: prime,
            tooltip: name,
          };
        });

        self[EIDModel.SPOT_ID].spots = spots;
        self[EIDModel.SPOT_ID].tags = getTags(spots);
      } catch (error) {
        console.log('error', error);
      }
    }),
    getSitesData: flow(function* getAppData() {
      try {
        const { data } = yield getApplications({});
        console.log('sites', data.response);
        const sites = data.response.map(site => {
          const { id, url } = site;

          return {
            id: String(id),
            domain: url,
            avg: 'n/a',
          };
        });

        self[EIDModel.SITE_ID].sites = sites;
        self[EIDModel.SITE_ID].tags = getTags(sites);
      } catch (error) {
        console.log('error', error);
      }
    }),
  }));

function getTags(sourceArr) {
  return sourceArr.map(({ id, tooltip, status }) => ({
    id,
    tooltip,
    status,
  }));
}

export type TAudienceModel = Instance<typeof AudienceModel>;

export default AudienceModel;
