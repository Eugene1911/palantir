const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

const routes = [
  {
    name: 'campaignsList',
  },
  {
    name: 'home',
  },
];

module.exports = routes.map(
  ({ name }) =>
    new HtmlWebpackPlugin({
      inject: true,
      filename: `${paths.root}/${name}.html`,
      template: `${paths.appPublic}/${name}.html`,
      chunks: [name],
      minify: false,
    }),
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
