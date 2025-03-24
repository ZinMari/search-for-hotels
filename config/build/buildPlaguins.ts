import webpack from 'webpack';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import CopyPlugin from "copy-webpack-plugin";
import { BuildOptions } from './types/types';

export function buildPlaguins({ mode, paths }: BuildOptions): Configuration['plugins'] {
  const isDev = mode === 'development';
  const isProd = mode === 'production';
  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({ template: paths.index, filename: 'index.html', title: 'Toxin' }),
    new HtmlWebpackPlugin({ template: paths.cards, filename: 'cards.html', title: 'Cards' }),
    new HtmlWebpackPlugin({ template: paths.colorsType, filename: 'colors-type.html', title: 'Colors Type'  }),
    new HtmlWebpackPlugin({ template: paths.formElements, filename: 'form-elements.html', title: 'Form Elements'  }),
    new HtmlWebpackPlugin({ template: paths.headersFooters, filename: 'headers-footers.html', title: 'Headers Footers' }),
    new HtmlWebpackPlugin({ template: paths.roomDetails, filename: 'room-details.html', title: 'Room Details'  }),
    new HtmlWebpackPlugin({ template: paths.searchRoom, filename: 'search-room.html', title: 'Search Room'   }),
    new HtmlWebpackPlugin({ template: paths.userLogin, filename: 'user-login.html', title: 'User Login' }),
    new HtmlWebpackPlugin({ template: paths.userRegistration, filename: 'user-registration.html', title: 'User Registration' }),
    new CopyPlugin({
      patterns: [
        { from: "src/**/*.{png,svg,jpg,jpeg,gif}",  to: "assets/[name][ext]"},
      ],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    })
  ];

  if (isDev) {
    plugins.push()  
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
