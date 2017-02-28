'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
   context: __dirname + '/Development/css',

   entry: {
      index: './index',
   },

   output: {
      path: __dirname + '/Production',
      publicPath: '/',
      filename: 'index.js',
   },

   watch: NODE_ENV == 'development',
   watchOptions: {
      aggregateTimeout: 100,
      ignored: /node_modules/
   },

   devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : false,

   resolve: {
      modules: ['node_modules'],
      extensions: ['.js']
   },

   resolveLoader: {
      modules: ['node_modules'],
      moduleExtensions: ['-loader'],
      extensions: ['.js']
   },

   module: {
      rules: [
      {
         test: /\.css$/,
         include: __dirname + '/Development',
         use: ExtractTextPlugin.extract(
            {
               fallback: 'style',
               use: [
                  {loader: 'css'},
                  {
                     loader: 'postcss',
                     options: {
                        plugins: function () {
                           return [
                           require('autoprefixer')
                           ];
                        }
                     }
                  },
               ]
            })
      }, 
      {
         test:   /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
         exclude: /(node_modules)/,
         loader: 'file-loader?name=[path][name].[ext]',
      }]
   },
   
   plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
         NODE_ENV: JSON.stringify(NODE_ENV)
      }),
      new ExtractTextPlugin({
         filename:  'styles.css',
         allChunks: true
      }),
   ],

   devServer: {
      contentBase: __dirname + '/Production',
      port: 9000,
      compress: true,
      inline: true,
      hot: true
   }
};

if (NODE_ENV == 'production') {
   module.exports.plugins.push(
      new webpack.LoaderOptionsPlugin({
         minimize: true,
         debug: false
      }),
      new webpack.DefinePlugin({
         'process.env': {
            'NODE_ENV': JSON.stringify('production')
         }
      }),
      new webpack.optimize.UglifyJsPlugin({
         beautify: false,
         mangle: {
            screw_ie8: true,
            keep_fnames: true
         },
         compress: {
            screw_ie8: true
         },
         comments: false
      })
   );
}