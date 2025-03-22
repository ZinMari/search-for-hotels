import webpack from 'webpack';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import CopyPlugin from "copy-webpack-plugin";
import { BuildOptions } from './types/types';
import path from 'path';

export function buildPlaguins({ mode, paths }: BuildOptions): Configuration['plugins'] {
  const isDev = mode === 'development';
  const isProd = mode === 'production';
  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({ template: paths.index, filename: 'index.html' }),
    new HtmlWebpackPlugin({ template: paths.cards, filename: 'cards.html' }),
    new HtmlWebpackPlugin({ template: paths.colorsType, filename: 'colors-type.html' }),
    new HtmlWebpackPlugin({ template: paths.formElements, filename: 'form-elements.html' }),
    new HtmlWebpackPlugin({ template: paths.headersFooters, filename: 'headers-footers.html' }),
    new HtmlWebpackPlugin({ template: paths.roomDetails, filename: 'room-details.html' }),
    new HtmlWebpackPlugin({ template: paths.searchRoom, filename: 'search-room.html' }),
    new HtmlWebpackPlugin({ template: paths.userLogin, filename: 'user-login.html' }),
    new HtmlWebpackPlugin({ template: paths.userRegistration, filename: 'user-registration.html' }),
    new CopyPlugin({
      patterns: [
        { from: "src/**/*.{png,svg,jpg,jpeg,gif}",  to: "assets/[name][ext]"},
      ],
    }),
  ];

  if (isDev) {
    plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
    );
  }
  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
      // new FaviconsWebpackPlugin({
      //   logo: './src/resources/favicon.png',
      //   mode: 'webapp',
      //   devMode: 'webapp',
      //   prefix: 'assets/favicons/',
      //   cache: true,
      //   inject: htmlPlugin => {
      //     return true
      //   },
      //   favicons: {
      //     background: '#fff',
      //     theme_color: '#333'
      //   }
      // }),
    );
  }
  return plugins;
}
