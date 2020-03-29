//const webpack = require("webpack");
const path = require("path");
const GlobEntriesPlugin = require("webpack-watched-glob-entries-plugin");

module.exports = {
  copyIgnore: [
    '**/*.js',
    '**/*.ts',
    '**/*.tsx',
    '**/*.json',
  ],
  webpack: (/** @type {import('webpack').Configuration} */ config, { dev }) => {
    //config.plugins = config.plugins.filter(plugin => !(plugin instanceof webpack.ProvidePlugin))
    config.resolve.extensions.push(".ts", ".tsx");
    config.entry = GlobEntriesPlugin.getEntries(
      [
        path.resolve('app', '*.{js,mjs,jsx,ts,tsx}'),
        path.resolve('app', '?(scripts)/*.{js,mjs,jsx,ts,tsx}')
      ]
    )
    config.module.rules = config.module.rules.map((rule) => {
      if (rule.use && rule.use.loader.includes("babel-loader")) {
        rule.test = /\.(js|jsx|mjs|ts|tsx)$/;
        rule.use.options = {
          ...rule.use.options,
          babelrc: true,
          extends: path.join(__dirname + "/.babelrc"),
          cacheDirectory: true,
          envName: dev ? "development" : "production",
        };
      }
      return rule;
    });
    return config;
  },
};
