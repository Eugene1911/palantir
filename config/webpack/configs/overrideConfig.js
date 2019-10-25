const customPaths = require('./paths');
const { productionPlugins, commonPlugins } = require('./plugins');
const { entries, custonOutput } = require('./config');

const commonBuildConfig = () => (config, env) => {
  const { plugins, output } = config;

  config.plugins = [...plugins, ...commonPlugins];

  if (env === 'production') {
    config.output = {
      ...output,
      ...custonOutput,
    };
    config.entry = entries;
    config.plugins = [...plugins, ...productionPlugins];
  }

  return config;
};

const overridePaths = paths => {
  paths.appBuild = customPaths.rootStaticDest;

  return paths;
};

module.exports = {
  commonBuildConfig,
  overridePaths,
};
