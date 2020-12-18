// eslint-disable-next-line import/no-cycle
import { TSite, TSiteWithSpots, TSpot, TTag } from './AudienceStore';
import {
  EIDModel,
  ETagStatus,
} from '../assets/constants/commonAudienceTypes';

export function getTag({ id, tooltip, status }): TTag {
  return {
    id,
    tooltip: tooltip || '',
    status: status || ETagStatus.ACTIVE,
  };
}

export function getTags(sourceArr): TTag[] {
  return sourceArr.map(({ id, tooltip, status }) => ({
    id,
    tooltip: tooltip || '',
    status: status || ETagStatus.ACTIVE,
  }));
}

export function getSpotFromData(spot: any, site: any): TSpot {
  return {
    id: String(spot.id),
    domain: site.app_url || site.url || '',
    avg: 'n/a',
    siteID: String(site.app_id || site.id),
    adZone: spot.name || 'ad Zone',
    isPrime: spot.is_prime !== undefined ? spot.is_prime : spot.prime,
    isMemberArea:
      spot.is_members_area !== undefined
        ? spot.is_members_area
        : spot.member_area_type === 'member_area',
    tooltip: spot.name,
    isMultiformat:
      spot.is_multiformat !== undefined
        ? spot.is_multiformat
        : spot.multiple,
    bid: '',
  };
}

export function getSiteFromData(site: any): TSite {
  return {
    id: String(site.app_id || site.id),
    domain: site.app_url || site.url,
    avg: 'n/a',
    tooltip: site.name || site.app_url || site.url,
  };
}

export function setSpotsBySites(data): TSiteWithSpots[] {
  return data.map(site => {
    return {
      id: String(site.app_id),
      domain: site.app_url,
      avg: 'n/a',
      tooltip: site.app_url,
      spots: site.spots.map(spot => {
        return getSpotFromData(spot, site);
      }),
    };
  });
}

export function setSite(siteData, self) {
  const newSite = getSiteFromData(siteData);
  const siteTag = getTag({
    ...newSite,
    status: ETagStatus.ACTIVE,
  });
  // @ts-ignore
  self[EIDModel.SITE_ID].sites = [
    ...self[EIDModel.SITE_ID].sites,
    newSite,
  ];
  // @ts-ignore
  self[EIDModel.SITE_ID].tags = [
    ...self[EIDModel.SITE_ID].tags,
    siteTag,
  ];

  return siteTag;
}

export function setSpot(spotData, self) {
  const newSpot = getSpotFromData(spotData, spotData.application);
  const spotTag = getTag({
    ...newSpot,
    status: ETagStatus.ACTIVE,
  });
  // @ts-ignore
  self[EIDModel.SPOT_ID].spots = [
    ...self[EIDModel.SPOT_ID].spots,
    newSpot,
  ];
  // @ts-ignore
  self[EIDModel.SPOT_ID].tags = [
    ...self[EIDModel.SPOT_ID].tags,
    spotTag,
  ];

  setSite(spotData.application, self);

  return spotTag;
}

export function getStoreSiteId(id: number | string) {
  return `1${id}`;
}
export function getStoreSpotId(id: number | string) {
  return `2${id}`;
}
export function getStoreSubId(id: number | string) {
  return `3${id}`;
}
