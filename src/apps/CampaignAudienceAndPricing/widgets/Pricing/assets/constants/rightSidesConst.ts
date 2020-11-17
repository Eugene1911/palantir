import { EAdModel } from './commonPricingTypes';

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
