const paths = require('./paths');

/**
 * Path to /src/apps/{app}
 *
 * { name of chank : [path to entry file] }
 */
const entries = {
  campaignsList: [`${paths.appSrc}/apps/CampaignList/index.js`],
  clientListing: [`${paths.appSrc}/apps/ClientListing/index.tsx`],
  backofficeTools: [`${paths.appSrc}/apps/BackofficeTools/index.tsx`],
  optimizers: [`${paths.appSrc}/apps/Optimizers/index.tsx`],
  newCampaignSettings: [
    `${paths.appSrc}/apps/NewCampaignSettings/index.tsx`,
  ],
  campaignAudienceAndPricing: [
    `${paths.appSrc}/apps/CampaignAudienceAndPricing/index.tsx`,
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
    name: 'tools',
    filedirSrc: `${paths.rootTemplateSrc}/backoffice`,
    filedirDest: `${paths.rootTemplateDest}/backoffice`,
    chunks: ['backofficeTools'],
  },
  {
    name: 'optimizers',
    filedirSrc: `${paths.rootTemplateSrc}/advertisers`,
    filedirDest: `${paths.rootTemplateDest}/advertisers`,
    chunks: ['optimizers'],
  },
  {
    name: 'new_create_campaign_settings',
    filedirSrc: `${paths.rootTemplateSrc}/advertisers`,
    filedirDest: `${paths.rootTemplateDest}/advertisers`,
    chunks: ['newCampaignSettings'],
  },
  {
    name: 'new_create_campaign_audience_pricing',
    filedirSrc: `${paths.rootTemplateSrc}/advertisers`,
    filedirDest: `${paths.rootTemplateDest}/advertisers`,
    chunks: ['campaignAudienceAndPricing'],
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
