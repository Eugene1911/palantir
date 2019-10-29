const customPaths = require('./paths');
const {
  productionPlugins,
  commonPlugins,
  moduleRules,
} = require('./plugins');
const { entries, customOutput } = require('./config');

const commonBuildConfig = () => (config, env) => {
  const { output, plugins } = config;

  // config.plugins.push(...commonPlugins);
  // config.plugins = [...plugins, ...commonPlugins];

  if (env === 'production') {
    config.output = {
      ...output,
      ...customOutput,
    };
    config.entry = entries;
    // config.plugins.push(...productionPlugins);
    config.plugins = [...plugins, ...productionPlugins];
    // config.module.rules.push(...moduleRules);
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
