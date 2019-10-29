const paths = require('./paths');

/**
 * Path to /src/apps/{app}
 *
 * { name of chank : [path to entry file] }
 */
const entries = {
  campaignsList: [`${paths.appSrc}/apps/CampaignList/index.js`],
  clientListing: [`${paths.appSrc}/apps/ClientListing/index.js`],
  currencyExchange: [
    `${paths.appSrc}/apps/CurrencyExchange/index.js`,
  ],
};

/**
 * List of template routs ../templates_palantir/{template_name}
 *
 * name - template name
 * filedirSrc - path to template
 * filedirDest - path where will be put template after deploy
 * chunks - name of chank
 */
const routes = [
  {
    name: 'campaign_list',
    filedirSrc: `${paths.rootTemplateSrc}/backoffice`,
    filedirDest: `${paths.rootTemplateDest}/backoffice`,
    chunks: ['campaignsList'],
  },
  {
    name: 'client_listing',
    filedirSrc: `${paths.rootTemplateSrc}/backoffice`,
    filedirDest: `${paths.rootTemplateDest}/backoffice`,
    chunks: ['clientListing'],
  },
  {
    name: 'currency_exchange',
    filedirSrc: `${paths.rootTemplateSrc}/backoffice`,
    filedirDest: `${paths.rootTemplateDest}/backoffice`,
    chunks: ['currencyExchange'],
  },
];

/**
 * Patch ouptuts deploy path
 */
const customOutput = {
  filename: 'static/js/[name].[hash].js',
  chunkFilename: 'static/js/[name].[hash].chunk.js',
  publicPath: paths.rootStaticPublicPath,
};

module.exports = {
  routes,
  entries,
  customOutput,
};
