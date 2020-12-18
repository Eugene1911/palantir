import { flow, getSnapshot, Instance, types } from 'mobx-state-tree';
import union from 'lodash/union';
import flatten from 'lodash/flatten';
import uniqBy from 'lodash/uniqBy';
import {
  getApplication,
  getApplications,
  getFormats,
  getSpot,
  getSpotsByApp,
  saveSpotPrice,
} from 'resources/api';
import FilterSideStore from 'sharedWidgets/FilterSide/store/FilterSideStore';
import {
  EFetchStatus,
  IAudienceResultData,
} from '../../../assets/commonTypes';
import {
  EIDModel,
  EListType,
  ETagStatus,
  ETrafficSource,
  ETrafficType,
} from '../assets/constants/commonAudienceTypes';
import { resultTrafficType } from '../assets/constants/resultConst';
import {
  // getSiteFromData,
  // getSpotFromData,
  getTag,
  getTags,
  setSite,
  setSpot,
  setSpotsBySites,
} from './utils';

export const InitialAudienceModel = {
  trafficType: ETrafficType.RON,
  trafficSource: ETrafficSource.ALL,
  rtb: true,
  [EIDModel.SITE_ID]: {
    listType: EListType.WHITE,
    fetchStatus: EFetchStatus.NOT_FETCHED,
    tags: [],
    tagsSelected: [],
  },
  [EIDModel.SPOT_ID]: {
    listType: EListType.WHITE,
    fetchStatus: EFetchStatus.NOT_FETCHED,
    tags: [],
    tagsSelected: [],
  },
  [EIDModel.SUB_ID]: {
    listType: EListType.WHITE,
    tags: [],
    tagsSelected: [],
  },
  isAdvancedOpen: false,
  formats: {
    fetchStatus: EFetchStatus.NOT_FETCHED,
    allFormats: [],
    currentFormat: 1,
  },
  filterSideModel: EIDModel.SITE_ID,
  filterSideStore: FilterSideStore.create({}),
};

const Site = types.model({
  id: types.identifier,
  domain: types.string,
  avg: types.string,
  tooltip: types.string,
});

const Spot = types.model({
  id: types.identifier,
  siteID: types.string,
  domain: types.string,
  avg: types.string,
  adZone: types.string,
  isMultiformat: types.boolean,
  bid: types.optional(types.string, ''),
  isPrime: types.boolean,
  isMemberArea: types.boolean,
  tooltip: types.string,
});

const SiteWithSpots = types.model({
  id: types.identifier,
  domain: types.string,
  avg: types.string,
  tooltip: types.string,
  spots: types.array(Spot),
});

const TagProps = {
  id: types.identifier,
  status: types.optional(
    types.enumeration<ETagStatus>(Object.values(ETagStatus)),
    ETagStatus.ACTIVE,
  ),
  tooltip: types.optional(types.string, ''),
};

const SpotTag = types.model(TagProps);

const SiteTag = types.model(TagProps);

const SubTag = types.model(TagProps);

const Format = types.model({
  id: types.number,
  name: types.string,
  type: types.string,
});

const AudienceModel = types
  .model({
    trafficType: types.number,
    [EIDModel.SITE_ID]: types.model(EIDModel.SITE_ID, {
      listType: types.number,
      tags: types.optional(types.array(SiteTag), []),
      tagsSelected: types.optional(
        types.array(types.reference(SiteTag)),
        [],
      ),
      sites: types.optional(types.array(Site), []),
      fetchStatus: types.enumeration<EFetchStatus>(
        Object.values(EFetchStatus),
      ),
    }),
    [EIDModel.SPOT_ID]: types.model(EIDModel.SPOT_ID, {
      listType: types.number,
      tags: types.optional(types.array(SpotTag), []),
      tagsSelected: types.optional(
        types.array(types.reference(SpotTag)),
        [],
      ),
      spots: types.optional(types.array(Spot), []),
      primeSpotsBySites: types.optional(
        types.array(SiteWithSpots),
        [],
      ),
      membersAreaSpotsBySites: types.optional(
        types.array(SiteWithSpots),
        [],
      ),
      fetchStatus: types.enumeration<EFetchStatus>(
        Object.values(EFetchStatus),
      ),
    }),
    [EIDModel.SUB_ID]: types.model(EIDModel.SUB_ID, {
      listType: types.number,
      tags: types.optional(types.array(SubTag), []),
      tagsSelected: types.optional(types.array(SubTag), []),
    }),
    trafficSource: types.enumeration<ETrafficSource>(
      Object.values(ETrafficSource),
    ),
    rtb: types.boolean,
    isAdvancedOpen: types.boolean,
    filterSideModel: types.enumeration<EIDModel>(
      Object.values(EIDModel),
    ),
    formats: types.model('formats', {
      fetchStatus: types.enumeration<EFetchStatus>(
        Object.values(EFetchStatus),
      ),
      currentFormat: types.optional(types.number, 1),
      allFormats: types.array(Format),
    }),
    filterSideStore: FilterSideStore,
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
      if (trafficType === ETrafficType.RON) {
        // @ts-ignore
        self[EIDModel.SPOT_ID].tagsSelected = [];
      } else {
        // @ts-ignore
        self[EIDModel.SPOT_ID].tagsSelected = self[
          EIDModel.SPOT_ID
        ].spots
          .filter(
            ({ isPrime }) =>
              (trafficType === ETrafficType.PRIME) === isPrime,
          )
          .map(({ id }) => id);
      }
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
      // @ts-ignore
      self[model].tags = getTags(sourceArr);
    },
    setSpotBid(bid: string, spotID: string) {
      const { spots } = self[EIDModel.SPOT_ID];
      spots.find(({ id }) => id === spotID).bid = bid;
      self[EIDModel.SPOT_ID].spots = spots;
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
        .filter(({ isPrime, isMemberArea }) =>
          prime ? isPrime : isMemberArea,
        )
        .map(spot => spot.id);

      const tagsToAdd = self[EIDModel.SPOT_ID].tags.filter(({ id }) =>
        spotIDs.includes(id),
      );

      // @ts-ignore
      self[EIDModel.SPOT_ID].tagsSelected = union(
        self[EIDModel.SPOT_ID].tagsSelected,
        tagsToAdd,
      );
    },
    saveBids() {
      const selectedIds = self[EIDModel.SPOT_ID].tagsSelected.map(
        ({ id }) => id,
      );

      const selectedSpots = self[
        EIDModel.SPOT_ID
      ].spots.filter(({ id }) => selectedIds.includes(id));

      selectedSpots.forEach(
        // Добавить Campaign id
        ({ bid, id }) => bid && saveSpotPrice(1, id, {}),
      );
    },
    getAudienceResultData(): IAudienceResultData {
      const isSitesBlack =
        self[EIDModel.SITE_ID].listType === EListType.BLACK;
      const isSpotsBlack =
        self[EIDModel.SPOT_ID].listType === EListType.BLACK;
      const isSubsBlack =
        self[EIDModel.SUB_ID].listType === EListType.BLACK;
      const getIds = tags => tags.map(({ id }) => Number(id));

      const result = {
        /* eslint-disable @typescript-eslint/camelcase */
        traffic_type: resultTrafficType[self.trafficType],
        spots: isSpotsBlack
          ? []
          : getIds(
              self[EIDModel.SPOT_ID].tagsSelected.filter(
                ({ status }) => status === ETagStatus.ACTIVE,
              ),
            ),
        exclude_spots: !isSpotsBlack
          ? []
          : getIds(
              self[EIDModel.SPOT_ID].tagsSelected.filter(
                ({ status }) => status === ETagStatus.ACTIVE,
              ),
            ),
        enabled_applications: isSitesBlack
          ? []
          : getIds(
              self[EIDModel.SITE_ID].tagsSelected.filter(
                ({ status }) => status === ETagStatus.ACTIVE,
              ),
            ),
        disabled_applications: !isSitesBlack
          ? []
          : getIds(
              self[EIDModel.SITE_ID].tagsSelected.filter(
                ({ status }) => status === ETagStatus.ACTIVE,
              ),
            ),
        enabled_subids: isSubsBlack
          ? []
          : self[EIDModel.SUB_ID].tagsSelected.map(({ id }) => id),
        disabled_subids: !isSubsBlack
          ? []
          : self[EIDModel.SUB_ID].tagsSelected.map(({ id }) => id),
        traffic_source_type: self.trafficSource,
        disable_rtb: !self.rtb,
        /* eslint-enable @typescript-eslint/camelcase */
      };

      return result;
    },
    // запросы
    setAudienceData: flow(function* setAudienceData(
      data: IAudienceResultData,
    ) {
      /* eslint-disable @typescript-eslint/camelcase */
      const {
        spots,
        exclude_spots,
        enabled_applications,
        disabled_applications,
        enabled_subids,
        disabled_subids,
        traffic_type,
        traffic_source_type,
        disable_rtb,
        format_id,
      } = data;

      console.log('audience data', {
        spots,
        exclude_spots,
        enabled_applications,
        disabled_applications,
        enabled_subids,
        disabled_subids,
        traffic_type,
        traffic_source_type,
        disable_rtb,
        format_id,
      });

      self.formats.currentFormat = format_id;
      self.trafficType = resultTrafficType[traffic_type];
      traffic_source_type
        ? (self.trafficSource = traffic_source_type)
        : (self.trafficSource = InitialAudienceModel.trafficSource);
      disable_rtb
        ? (self.rtb = !disable_rtb)
        : (self.rtb = InitialAudienceModel.rtb);

      const setTagsFromData = (model, tagsWhite, tagsBlack) => {
        if (tagsBlack?.length > 0) {
          self[model].listType = EListType.BLACK;
          // @ts-ignore
          self[model].tagsSelected = tagsBlack.map(tag =>
            String(tag),
          );
        } else if (tagsWhite?.length > 0) {
          self[model].listType = EListType.WHITE;
          // @ts-ignore
          self[model].tagsSelected = tagsWhite.map(tag =>
            String(tag),
          );
        } else {
          self[model].listType = EListType.WHITE;
          self[model].tagsSelected = [];
        }
      };

      setTagsFromData(EIDModel.SPOT_ID, spots, exclude_spots);
      // eslint-disable-next-line no-restricted-syntax
      for (const tag of self[EIDModel.SPOT_ID].tagsSelected) {
        if (
          !self[EIDModel.SPOT_ID].spots.find(
            ({ id }) => tag.id === id,
          )
        ) {
          const { data: spotData } = yield getSpot(Number(tag.id));
          console.log('set newSpot data', spotData);
          setSpot(spotData, self);
        }
      }

      setTagsFromData(
        EIDModel.SITE_ID,
        enabled_applications,
        disabled_applications,
      );
      // eslint-disable-next-line no-restricted-syntax
      for (const tag of self[EIDModel.SITE_ID].tagsSelected) {
        if (
          !self[EIDModel.SITE_ID].sites.find(
            ({ id }) => tag.id === id,
          )
        ) {
          const { data: siteData } = yield getApplication(
            Number(tag.id),
          );
          console.log('set siteData data', siteData);
          setSite(siteData, self);
        }
      }

      setTagsFromData(
        EIDModel.SUB_ID,
        enabled_subids,
        disabled_subids,
      );
      /* eslint-enable @typescript-eslint/camelcase */
    }),
    getSpotsData: flow(function* getSpotsData(
      externalFormat?: number,
    ) {
      try {
        self[EIDModel.SPOT_ID].fetchStatus = EFetchStatus.PENDING;

        const format = externalFormat || self.formats.currentFormat;
        console.log('format', format);
        /* eslint-disable @typescript-eslint/camelcase */
        const [prime, membersArea] = yield Promise.all([
          getSpotsByApp({
            ad_format_id: format,
            traffic_type: 'prime',
            size: 1900,
          }),
          getSpotsByApp({
            ad_format_id: format,
            traffic_type: 'members_area',
            size: 1900,
          }),
        ]);
        /* eslint-enable @typescript-eslint/camelcase */
        const dataPrime = prime.data.response;
        const dataMembersArea = membersArea.data.response;
        console.log('spots by sites', dataPrime, dataMembersArea);

        const primeSpotsBySites = setSpotsBySites(dataPrime);
        const membersAreaSpotsBySites = setSpotsBySites(
          dataMembersArea,
        );

        // @ts-ignore
        self[EIDModel.SPOT_ID].primeSpotsBySites = primeSpotsBySites;
        // @ts-ignore
        self[
          EIDModel.SPOT_ID
        ].membersAreaSpotsBySites = membersAreaSpotsBySites;

        const primeSpots = primeSpotsBySites.map(site => {
          return site.spots;
        });
        const primeSites = primeSpotsBySites.map(site => {
          return {
            id: site.id,
            domain: site.domain,
            avg: site.avg,
            tooltip: site.domain,
          };
        });
        const membersAreaSpots = membersAreaSpotsBySites.map(site => {
          return site.spots;
        });
        const membersAreaSites = membersAreaSpotsBySites.map(site => {
          return {
            id: site.id,
            domain: site.domain,
            avg: site.avg,
            tooltip: site.domain,
          };
        });

        const spots = uniqBy(
          flatten([...primeSpots, ...membersAreaSpots]),
          'id',
        );
        const sites = uniqBy(
          [...primeSites, ...membersAreaSites],
          'id',
        );
        console.log('all spots', spots);
        console.log('all sites', sites);

        // @ts-ignore
        self[EIDModel.SPOT_ID].spots = spots;
        // @ts-ignore
        self[EIDModel.SPOT_ID].tags = getTags(spots);

        // @ts-ignore
        self[EIDModel.SITE_ID].sites = sites;
        // @ts-ignore
        self[EIDModel.SITE_ID].tags = getTags(sites);

        // убрать
        // self[EIDModel.SPOT_ID].tagsSelected = spots.map(
        //   tag => tag.id,
        // );

        self[EIDModel.SPOT_ID].fetchStatus = EFetchStatus.SUCCESS;
      } catch (error) {
        self[EIDModel.SPOT_ID].fetchStatus = EFetchStatus.ERROR;
        // tslint:disable-next-line:no-console
        console.log('error', error);
      }
    }),
    getSitesData: flow(function* getAppData() {
      try {
        self[EIDModel.SITE_ID].fetchStatus = EFetchStatus.PENDING;
        const { data } = yield getApplications({
          // page: 1,
          // size: 15000,
        });
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
        // @ts-ignore
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
    getFormats: flow(function* getFormat() {
      try {
        self.formats.fetchStatus = EFetchStatus.PENDING;
        const { data } = yield getFormats({});
        const formats = data.map(({ id, name, type }) => ({
          id,
          name,
          type,
        }));

        self.formats.allFormats = formats;
        self.formats.currentFormat = formats[0].id;
        console.log('formats', formats);

        self.formats.fetchStatus = EFetchStatus.SUCCESS;
      } catch (error) {
        self.formats.fetchStatus = EFetchStatus.ERROR;
        // tslint:disable-next-line:no-console
        console.log('error', error);
      }
    }),
    getTagById: flow(function* getTagById(
      tagId: string,
      model: EIDModel,
    ) {
      if (model === EIDModel.SUB_ID) {
        return tagId;
      }

      const setDisabledTag = () => {
        // @ts-ignore
        self[model].tags = [
          ...self[model].tags,
          getTag({
            id: tagId,
            tooltip: '',
            status: ETagStatus.DISABLED,
          }),
        ];
      };
      const checkTag = ({ id }) => id === tagId;
      const isSpot = model === EIDModel.SPOT_ID;

      try {
        if (isSpot) {
          const oldSpot = self[EIDModel.SPOT_ID].spots.find(checkTag);
          if (oldSpot) {
            return self[EIDModel.SPOT_ID].tags.find(checkTag);
          }

          if (!Number(tagId)) {
            !self[EIDModel.SPOT_ID].tags.find(checkTag) &&
              setDisabledTag();
            console.log(
              'snapshot',
              getSnapshot(self[EIDModel.SPOT_ID]),
            );
            return false;
          }

          const { data: spotData } = yield getSpot(Number(tagId));
          console.log('newSpot data', spotData);
          const spotTag = setSpot(spotData, self);

          return spotTag;
        }
        const oldSite = self[EIDModel.SITE_ID].sites.find(checkTag);
        if (oldSite) {
          return self[EIDModel.SITE_ID].tags.find(checkTag);
        }

        if (!Number(tagId)) {
          !self[EIDModel.SITE_ID].tags.find(checkTag) &&
            setDisabledTag();
          return false;
        }

        const { data: siteData } = yield getApplication(
          Number(tagId),
        );
        console.log('newSite data', siteData);
        const siteTag = setSite(siteData, self);

        return siteTag;
      } catch (error) {
        // tslint:disable-next-line:no-console
        console.log('error', error);
        setDisabledTag();

        return false;
      }
    }),
  }));

export type TSite = Instance<typeof Site>;
export type TSpot = Instance<typeof Spot>;
export type TSiteWithSpots = Instance<typeof SiteWithSpots>;
export type TTag =
  | Instance<typeof SpotTag>
  | Instance<typeof SiteTag>
  | Instance<typeof SubTag>;
export type TAudienceModel = Instance<typeof AudienceModel>;

export default AudienceModel;
