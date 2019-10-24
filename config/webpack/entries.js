const paths = require('./paths');

const entries = {
  campaignsList: [
    // require.resolve('react-dev-utils/webpackHotDevClient'),
    // require.resolve('react-scripts/config/polyfills'),
    `${paths.appSrc}/apps/CampaignList/index.js`,
  ],
  clientListing: [`${paths.appSrc}/apps/ClientListing/index.js`],
  // stats: [
  // // require.resolve('react-dev-utils/webpackHotDevClient'),
  // // require.resolve('react-scripts/config/polyfills'),
  // `${paths.appSrc}/Apps/Stats/index.js`,
  // ],
};

module.exports = entries;
