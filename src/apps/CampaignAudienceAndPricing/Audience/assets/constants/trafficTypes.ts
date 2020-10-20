export enum ETrafficType {
  RON,
  PRIME,
  MEMBERS_AREA,
}

export const trafficTypes = {
  [ETrafficType.RON]: {
    title: 'RON',
    text: 'Run all spots of network.',
  },
  [ETrafficType.PRIME]: {
    title: 'PRIME',
    text: 'White list of best spots from our direct inventory.',
  },
  [ETrafficType.MEMBERS_AREA]: {
    title: 'MEMBERS AREA',
    text: 'White list of spots with advanced traffic.',
  },
};
