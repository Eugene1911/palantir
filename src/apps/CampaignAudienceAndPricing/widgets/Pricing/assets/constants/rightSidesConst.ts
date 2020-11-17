import { EAdModel, EBidStatus, EBidType } from './commonPricingTypes';

export const radioTitles = {
  asap: 'ASAP',
  even: 'EVEN',
  standard: 'STANDARD',
  dynamic: 'DYNAMIC',
  [EAdModel.CPM]: {
    title: 'CPM',
    text: 'Cost per thousand impressions.',
  },
  [EAdModel.CPC]: {
    title: 'CPC',
    text: 'Cost per click.',
  },
  [EAdModel.CPA]: {
    title: 'CPA',
    text: 'Cost per action.',
  },
};

export const switchTitles = {
  totalBudget: 'TOTAL BUDGET',
  custom: 'CUSTOM',
};

export const textFieldLabels = {
  dailyBudget: 'Daily budget',
  totalBudget: 'Total budget',
  rtb: 'RTB',
};

export const tooltips = {
  dailyBudget:
    'The daily spending limit for the campaign.\n' +
    '\n' +
    'Please note that depending on your targeting options, \n' +
    'this limitation might not be respected.',
  totalBudget:
    'The total spending limit for the campaign for all the time of running it.\n' +
    '\n' +
    'Please note that depending on your targeting options, \n' +
    'this limitation might not be respected.',
};

export const unavailableCustomSpots =
  'When the campaign will run, you will be able to add custom prices for spots which will have any traffic';

export const addCustom = 'ADD CUSTOM';

export const bidPriceButtons = {
  apply: 'APPLY BID',
  [EBidType.MINIMUM]: {
    title: 'MINIMUM BID',
    text: 'The lowest possible bid for your targeting',
    list: [
      'Does not includes all of your targeting',
      'Lowest price for traffic within your targeting',
    ],
  },
  [EBidType.TARGET]: {
    title: 'TARGET COVERING BID',
    text: 'The minimum bid to compete for all the targeted traffic',
    list: [
      'Includes all of your targeting',
      'The minimum bid to participate in all auctions for targeted',
    ],
  },
  [EBidType.RECOMMENDED]: {
    title: 'RECOMMENDED',
    text: 'Recommended bid for optimal auction results',
    list: [
      'Includes all of your targeting',
      'The recommended bid to test the chosen target',
    ],
  },
};

export const bidStatuses = {
  [EBidStatus.OPTIMAL]:
    'OPTIMAL CHOICE TO RECEIVE TRAFFIC FROM ALL OF YOUR SELECTED TARGET.',
  [EBidStatus.COVERED]:
    'YOU COVERED SELECTED TARGET MINIMUM BID AND WILL RECEIVE TRAFFIC.',
  [EBidStatus.LOW]:
    'THE BID IS TOO LOW FOR THE SELECTED TARGETING, PLEASE BID HIGHER TO COVER IT ALL.',
  [EBidStatus.ERROR]:
    'YOU CANNOT SAVE THE CAMPAIGN WITH THIS BID. THE BID IS TOO LOW FOR THE SELECTED TARGETING.',
};
