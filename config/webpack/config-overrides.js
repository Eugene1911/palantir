const entries = require('./entries');
const appRoutes = require('./appRoutes');
const customPaths = require('./paths');

module.exports = {
  webpack(config, env) {
    if (env === 'production') {
      const { plugins } = config;

      (config.output.filename = 'static/js/[name].[hash].js'),
        (config.output.chunkFilename =
          'static/js/[name].[hash].chunk.js'),
        (config.output.publicPath = customPaths.rootStaticPublicPath),
        (config.entry = entries);
      config.plugins = [...plugins, ...appRoutes];
    }

    return config;
  },

  paths(paths, env) {
    paths.appBuild = customPaths.rootStaticDest;

    return paths;
  },
};

// function override(config, env) {
// if (env === 'production') {
// const { plugins, output } = config;
// const otherBuildPlace = {
// path: paths.root,
// };

// // config.output = {
// // path: paths.appBuild,
// // pathinfo: true,
// // filename: 'static/js/[name].[hash].bundle.js',
// // chunkFilename: 'static/js/[name].[hash].chunk.js',
// // publicPath: publicPath,
// // devtoolModuleFilenameTemplate: info =>
// // path.resolve(info.absoluteResourcePath),
// // };

// config.output = { ...output, ...otherBuildPlace };
// config.entry = entries;
// config.plugins = [...plugins, ...appRoutes];

// console.log(config);
// }

// return config;
// };
