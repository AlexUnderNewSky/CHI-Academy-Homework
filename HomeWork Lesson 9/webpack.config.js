const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/main.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.[contenthash].js",
      publicPath: "/",
    },
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "eval-source-map",
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new CleanWebpackPlugin(),
    ],
    resolve: {
      extensions: [".js", ".jsx", ".tsx", ".ts"],
      fallback: {
        fs: false,
        stream: false,
        zlib: false,
        // process: require.resolve("process/browser"),
      },
    },
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     process: "process/browser", // Глобально предоставляем переменную process
    //   }),
    // ],
    devServer: {
      hot: true, // Enables hot module replacement
      port: 8080,
      open: true,
      compress: true,
      static: {
        directory: path.resolve(__dirname, "public"), // Use "public" for static files
      },
      historyApiFallback: true, // For React Router
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  };
};
