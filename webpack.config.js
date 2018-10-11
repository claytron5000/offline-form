const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      }
    ]
},
plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new CopyWebpackPlugin([
        {from: 'serviceworker.js', to: 'serviceworker.js'},
        {from: 'style.css', to: 'style.css'}
     ], {})
  ]
};
