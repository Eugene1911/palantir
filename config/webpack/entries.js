const paths = require('./paths');

const entries = {
  campaignsList: [
    // require.resolve('react-dev-utils/webpackHotDevClient'),
    // require.resolve('react-scripts/config/polyfills'),
    `${paths.appSrc}/apps/CampaignsList/index.js`,
  ],
  // stats: [
  // // require.resolve('react-dev-utils/webpackHotDevClient'),
  // // require.resolve('react-scripts/config/polyfills'),
  // `${paths.appSrc}/Apps/Stats/index.js`,
  // ],
  home: [`${paths.appSrc}/Apps/Home/index.js`],
};

module.exports = entries;
