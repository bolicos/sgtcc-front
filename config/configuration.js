const path = require("path");
const {
  override,
  addWebpackAlias,
  addBundleVisualizer,
} = require("customize-cra");

module.exports = {
  webpack: override(
    addWebpackAlias({
      "~": path.resolve(__dirname, ".."),
      "#": path.resolve(__dirname, "../src"),
    }),
    addBundleVisualizer({}, true)
  ),
  paths: (paths) => {
    paths.appBuild = path.resolve(
      __dirname,
      "..",
      process.env.REACT_APP_OUTPUT_PATH || "build"
    );

    return paths;
  },
};