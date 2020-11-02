export const radioTitles = {
  whitelist: 'WHITELIST',
  blacklist: 'BLACKLIST',
  all: 'ALL',
  partnerNetworks: 'PARTNER NETWORKS',
  directInventory: 'DIRECT INVENTORY',
  yes: 'YES',
  no: 'NO',
};

export const advanced = 'Advanced';

export const disabledTagToolTip = (isSpot: boolean) =>
  `We do not have such a ${
    isSpot ? 'spot' : 'site'
  } ID \nIt will not have traffic.`;
