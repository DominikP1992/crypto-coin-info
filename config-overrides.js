/* eslint-disable import/no-extraneous-dependencies */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// constants
const FILES_PATHS = './src/**/*.{ts,js,tsx,jsx}';

module.exports = function override(config) {
  const customPlugins = [
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        enabled: true,
        files: FILES_PATHS,
      },
    }),
  ];

  const customOptimization = { usedExports: true };

  return {
    ...config,
    plugins: [...config.plugins, ...customPlugins],
    optimization: { ...config.optimization, ...customOptimization },
  };
};
