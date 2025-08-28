import webpack from "webpack";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import { BuildOptions } from "./types/types";

export function buildPlaguins({
  mode,
  pagesData,
}: BuildOptions): Configuration["plugins"] {
  console.log(pagesData);
  const isDev = mode === "development";
  const isProd = mode === "production";
  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: pagesData.index,
      filename: "index.html",
      title: "Toxin",
    }),
    new HtmlWebpackPlugin({
      template: pagesData.cards,
      filename: "cards.html",
      title: "Cards",
    }),
    new HtmlWebpackPlugin({
      template: pagesData.colorsType,
      filename: "colors-type.html",
      title: "Colors Type",
    }),
    new HtmlWebpackPlugin({
      template: pagesData.formElements,
      filename: "form-elements.html",
      title: "Form Elements",
    }),
    new HtmlWebpackPlugin({
      template: pagesData.headersFooters,
      filename: "headers-footers.html",
      title: "Headers Footers",
    }),
    new HtmlWebpackPlugin({
      template: pagesData.roomDetails,
      filename: "room-details.html",
      title: "Room Details",
    }),
    new HtmlWebpackPlugin({
      template: pagesData.searchRoom,
      filename: "search-room.html",
      title: "Search Room",
    }),
    new HtmlWebpackPlugin({
      template: pagesData.userLogin,
      filename: "user-login.html",
      title: "User Login",
    }),
    new HtmlWebpackPlugin({
      template: pagesData.userRegistration,
      filename: "user-registration.html",
      title: "User Registration",
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/**/*.{png,svg,jpg,jpeg,gif}", to: "assets/[name][ext]" },
      ],
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ];

  if (isDev) {
    plugins.push();
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      }),
      new FaviconsWebpackPlugin({
        logo: "./src/resources/favicon.png",
        mode: "webapp",
        devMode: "webapp",
        prefix: "assets/favicons/",
        cache: true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        inject: (htmlPlugin) => {
          return true;
        },
        favicons: {
          background: "#fff",
          theme_color: "#333",
        },
      }),
    );
  }
  return plugins;
}
