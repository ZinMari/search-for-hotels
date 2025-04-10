import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlaguins } from "./buildPlaguins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options;
  const isDev = options.mode === "development";
  return {
    mode: mode ?? "development",
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: "bundle.[contenthash].js",
      clean: true,
      assetModuleFilename: "assets/[hash][ext][query]",
    },
    plugins: buildPlaguins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev && "inline-source-map",
    devServer: buildDevServer(options),
    performance: {
      maxAssetSize: 1000000,
    },
    ignoreWarnings: [
      {
        module: /node_modules\//,
        message: /@import "variables"/,
      },
    ],
  };
}
