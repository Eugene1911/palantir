const { override } = require('customize-cra');
const {
  commonBuildConfig,
  overridePaths,
} = require('./configs/overrideConfig');

module.exports = {
  webpack: override(commonBuildConfig()),
  paths: overridePaths,
};
