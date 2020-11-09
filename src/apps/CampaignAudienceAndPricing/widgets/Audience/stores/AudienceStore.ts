import { Instance, types, flow } from 'mobx-state-tree';
import union from 'lodash/union';
import { getApplications, getSpots } from 'resources/api';
import { EFetchStatus } from '../../../assets/commonTypes';
import {
  EListType,
  ETrafficType,
  ETagStatus,
  EIDModel,
  ETrafficSource,
} from '../assets/constants/commonAudienceTypes';

export const InitialAudienceModel = {
  trafficType: ETrafficType.RON,
  trafficSource: ETrafficSource.ALL,
  rtb: true,
  [EIDModel.SITE_ID]: {
    listType: EListType.WHITE,
    fetchStatus: EFetchStatus.PENDING,
    tags: [],
    tagsSelected: [],
  },
  [EIDModel.SPOT_ID]: {
    listType: EListType.WHITE,
    fetchStatus: EFetchStatus.PENDING,
    tags: [],
    tagsSelected: [],
  },
  [EIDModel.SUB_ID]: {
    listType: EListType.WHITE,
    tags: [],
    tagsSelected: [],
  },
  filterSideModel: EIDModel.SITE_ID,
  isAdvancedOpen: false,
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
      fetchStatus: types.enumeration<EFetchStatus>(
        Object.values(EFetchStatus),
      ),
    }),
    [EIDModel.SPOT_ID]: types.model(EIDModel.SPOT_ID, {
      listType: types.number,
      tags: types.optional(types.array(Tag), []),
      tagsSelected: types.optional(
        types.array(types.reference(Tag)),
        [],
      ),
      spots: types.optional(types.array(Spot), []),
      fetchStatus: types.enumeration<EFetchStatus>(
        Object.values(EFetchStatus),
      ),
    }),
    [EIDModel.SUB_ID]: types.model(EIDModel.SUB_ID, {
      listType: types.number,
      tags: types.optional(types.array(Tag), []),
      tagsSelected: types.optional(types.array(Tag), []),
    }),
    trafficSource: types.enumeration<ETrafficSource>(
      Object.values(ETrafficSource),
    ),
    rtb: types.boolean,
    filterSideModel: types.enumeration<EIDModel>(
      Object.values(EIDModel),
    ),
    isAdvancedOpen: types.boolean,
  })
  .views(self => ({
    get selectedSites() {
      const selectedIds = self[EIDModel.SITE_ID].tagsSelected.map(
        ({ id }) => id,
      );

      return self[EIDModel.SITE_ID].sites.filter(({ id }) =>
        selectedIds.includes(id),
      );
    },
    get selectedSpots() {
      const selectedIds = self[EIDModel.SPOT_ID].tagsSelected.map(
        ({ id }) => id,
      );

      return self[EIDModel.SPOT_ID].spots.filter(({ id }) =>
        selectedIds.includes(id),
      );
    },
  }))
  .actions(self => ({
    setTrafficType(trafficType: ETrafficType) {
      self.trafficType = trafficType;
    },
    setTrafficSource(trafficSource: ETrafficSource) {
      self.trafficSource = trafficSource;
    },
    setRtb(rtb: boolean) {
      self.rtb = rtb;
    },
    setListType(listType: EListType, model: EIDModel) {
      self[model].listType = listType;
    },
    setFilterSideModel(model: EIDModel) {
      self.filterSideModel = model;
    },
    toggleIsAdvancedOpen() {
      self.isAdvancedOpen = !self.isAdvancedOpen;
    },
    setTags(sourceArr, model: EIDModel) {
      self[model].tags = getTags(sourceArr);
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
    addAllSpots(prime: boolean) {
      const spotIDs = self[EIDModel.SPOT_ID].spots
        .filter(({ isPrime }) => isPrime === prime)
        .map(spot => spot.id);

      const tagsToAdd = self[EIDModel.SPOT_ID].tags.filter(({ id }) =>
        spotIDs.includes(id),
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      self[EIDModel.SPOT_ID].tagsSelected = union(
        self[EIDModel.SPOT_ID].tagsSelected,
        tagsToAdd,
      );
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
        self[EIDModel.SPOT_ID].fetchStatus = EFetchStatus.SUCCESS;

        // убрать
        // self[EIDModel.SPOT_ID].tagsSelected = spots.map(
        //   tag => tag.id,
        // );
      } catch (error) {
        self[EIDModel.SPOT_ID].fetchStatus = EFetchStatus.ERROR;
        // tslint:disable-next-line:no-console
        console.log('error', error);
      }
    }),
    getSitesData: flow(function* getAppData() {
      try {
        const { data } = yield getApplications({});
        console.log('sites', data.response);
        const sites = data.response.map(site => {
          const { id, url, name } = site;

          return {
            id: String(id),
            domain: url,
            avg: 'n/a',
            tooltip: name,
          };
        });

        self[EIDModel.SITE_ID].sites = sites;
        self[EIDModel.SITE_ID].tags = getTags(sites);
        self[EIDModel.SITE_ID].fetchStatus = EFetchStatus.SUCCESS;

        // убрать
        // self[EIDModel.SITE_ID].tagsSelected = sites.map(
        //   tag => tag.id,
        // );
      } catch (error) {
        self[EIDModel.SPOT_ID].fetchStatus = EFetchStatus.ERROR;
        // tslint:disable-next-line:no-console
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

export type TSite = Instance<typeof Site>;
export type TSpot = Instance<typeof Spot>;
export type TTag = Instance<typeof Tag>;
export type TAudienceModel = Instance<typeof AudienceModel>;

export default AudienceModel;
