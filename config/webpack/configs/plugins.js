const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const customPaths = require('./paths');
const { routes } = require('./config');

/**
 * Plugin @string-replace-loader
 */
const stringReplaceLoader = {
  test: /constants\.js$/,
  loader: 'string-replace-loader',
  options: {
    search: customPaths.i18nLocalesFilesPath,
    replace: `${customPaths.rootStaticPublicPath.slice(0, -1)}${
      customPaths.i18nLocalesFilesPath
    }`,
  },
};

/**
 * Plugin @HtmlWebpackPlugin
 */
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

/**
 * Production plugins
 */
const productionPlugins = [...pluginRoutes];

/**
 * Module rules
 */

const moduleRules = [stringReplaceLoader];
/**
 * Common plugins
 */
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
  moduleRules,
};
