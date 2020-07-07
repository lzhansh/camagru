// const path = require("path");
// const webpack = require("webpack");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const {CleanWebpackPlugin} = require("clean-webpack-plugin");

// // console.log(__dirname);
// module.exports = {
//   entry: "./src/client/index.js",
//   output: {
//     path: path.join(__dirname, 'dist'),
//     publicPath: '/',
//     filename: "bundle.js"
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader"
//         }
//       },
//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader"]
//       }
//     ]
//   },
//   devServer: {
//     port: 3000,
//     open: true,
//     proxy: {
//       "/": "http://localhost:8080"
//     }
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new webpack.HashedModuleIdsPlugin(),
//     new HtmlWebpackPlugin({
//       title: "Camagru",
//       template: "./index.html",
//       minify: {
//         collapseWhitespace: true,
//         collapseInlineTagWhitespace: true,
//         removeComments: true,
//         removeRedundantAttributes: true
//       }
//     }),
//   ],
//   mode: "production"
// };