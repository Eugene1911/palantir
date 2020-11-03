export enum RadioValues {
  NO_MATTER = 'no_matter',
  ONLY_FOR = 'only_for',
  EXCLUDE = 'exclude',
}

export enum FlatDealValues {
  NO = 'no',
  FLAT_RATE = 'flat_rate',
  FLAT_IMPRESSIONS = 'flat_impressions',
}

export const addBlockRadios = [
  { value: RadioValues.NO_MATTER, label: 'NO MATTER' },
  { value: RadioValues.ONLY_FOR, label: 'ONLY FOR ADBLOCK TRAFFIC' },
  { value: RadioValues.EXCLUDE, label: 'EXCLUDE ADBLOCK TRAFFIC' },
];

export const privateModeRadios = [
  { value: RadioValues.NO_MATTER, label: 'NO MATTER' },
  {
    value: RadioValues.ONLY_FOR,
    label: 'ONLY FOR PRIVATE MODE TRAFFIC',
  },
  {
    value: RadioValues.EXCLUDE,
    label: 'EXCLUDE PRIVATE MODE TRAFFIC',
  },
];

export const flashRadios = [
  { value: RadioValues.NO_MATTER, label: 'NO MATTER' },
  { value: RadioValues.ONLY_FOR, label: 'ONLY FOR FLASH TRAFFIC' },
  { value: RadioValues.EXCLUDE, label: 'EXCLUDE FLASH TRAFFIC' },
];

export const flatDealRadios = [
  { value: FlatDealValues.NO, label: 'NO' },
  { value: FlatDealValues.FLAT_RATE, label: 'FLAT RATE %' },
  {
    value: FlatDealValues.FLAT_IMPRESSIONS,
    label: 'FLAT IMPRESSIONS',
  },
];
