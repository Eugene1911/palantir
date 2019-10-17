const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

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
    chunks: ['clientList'],
  },
];

module.exports = routes.map(
  ({ name, filedirSrc, filedirDest, chunks }) => {
    return new HtmlWebpackPlugin({
      inject: false,
      filename: `${filedirDest}/${name}.html`,
      template: `${filedirSrc}/${name}.html`,
      chunks,
      minify: false,
    });
  },
);

/**
config.plugins.push(
new HtmlWebpackPlugin({
inject: true,
filename: `${paths.appBuild}/stats.html`,
template: `${paths.appPublic}/stats.html`,
chunks: ['stats'],
// minify: false,
})
);


config.plugins.push(
new HtmlWebpackPlugin({
inject: true,
filename: `${paths.appBuild}/home.html`,
template: `${paths.appPublic}/home.html`,
chunks: ['home'],
// minify: false,
})
);
*/
