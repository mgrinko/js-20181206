const path = require('path');

module.exports = {
  mode: 'none',
  entry: './js/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js'
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000
  }
};

// const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//
// module.exports = {
//   mode: 'none',
//   entry: './scripts/app.js',
//   output: {
//     path: path.resolve(__dirname, 'public'),
//     filename: 'build.js'
//   },
//
//   watch: true,
//   devtool: 'source-map',
//
//   module: {
//     rules: [
//       {
//         test: /\.hbs$/,
//         loader: "handlebars-loader"
//       },
//       {
//         test: /\.css$/,
//         use: [ 'style-loader', 'css-loader' ]
//       },
//       {
//         test: /\.js$/,
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env'],
//             plugins: ['@babel/plugin-transform-runtime'],
//           }
//         }
//       }
//     ]
//   },
//
//   optimization: {
//     minimize: true,
//     minimizer: [new UglifyJsPlugin({
//       sourceMap: true,
//     })],
//   },
//
//   devServer: {
//     contentBase: path.join(__dirname, 'public'),
//     port: 9000
//   }
// };
