const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { routes } = require('./config');

const pluginRoutes = routes.map(
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

const productionPlugins = [...pluginRoutes];

const commonPlugins = [
  new DashboardPlugin(),
  new DuplicatePackageCheckerPlugin({
    verbose: true,
    showHelp: true,
    strict: true,
  }),
  new FriendlyErrorsWebpackPlugin(),
];

module.exports = {
  productionPlugins,
  commonPlugins,
};
