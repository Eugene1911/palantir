import { ETrafficType } from './commonAudienceTypes';

export const resultTrafficType = {
  [ETrafficType.RON]: 'ron',
  [ETrafficType.PRIME]: 'prime',
  [ETrafficType.MEMBERS_AREA]: 'members_area',
  ron: ETrafficType.RON,
  prime: ETrafficType.PRIME,
  // eslint-disable-next-line @typescript-eslint/camelcase
  members_area: ETrafficType.MEMBERS_AREA,
};
