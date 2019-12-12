const webpack = require("webpack");
const path = require("path");
const GlobEntriesPlugin = require("webpack-watched-glob-entries-plugin");

module.exports = {
  webpack: (
    /** @type {import('webpack').Configuration} */ config,
    { dev, vendor }
  ) => {
    config.entry = {
      background: path.resolve("app", "scripts/background.ts"),
      options: path.resolve("app", "scripts/options.ts")
    };

    config.plugins = config.plugins.filter(
      plugin => !(plugin instanceof webpack.ProvidePlugin)
    );
    config.plugins = config.plugins.filter(
      plugin => !(plugin instanceof GlobEntriesPlugin)
    );

    config.resolve.extensions.push(".ts");
    config.resolve.extensions.push(".tsx");
    config.module.rules = config.module.rules.map(rule => {
      if (rule.use && rule.use.loader.includes("babel-loader")) {
        rule.test = /\.(js|jsx|mjs|ts|tsx)$/;
        rule.use.options = {
          ...rule.use.options,
          babelrc: true,
          extends: path.join(__dirname + "/.babelrc"),
          cacheDirectory: true,
          envName: dev ? "development" : "production"
        };
      }
      return rule;
    });
    return config;
  }
};
