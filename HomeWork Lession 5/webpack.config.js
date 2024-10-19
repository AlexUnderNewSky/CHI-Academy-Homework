const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.js", // Главный файл для входа (точка входа)
    output: {
      path: path.resolve(__dirname, "dist"), // Папка для сборки проекта
      filename: "bundle.js", // Имя файла сборки
      publicPath: `/`,
    },
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "eval-source-map",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, // Регулярное выражение для поиска всех файлов .js
          exclude: /node_modules/, // Исключаем папку node_modules
          use: {
            loader: "babel-loader", // Используем babel-loader для обработки JS
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
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
      extensions: [".js", ".jsx"],
    },
    devServer: {
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, "dist"),
      open: true,
      compress: true,
      hot: true,
      port: 8080,
    },
    optimization: {
      splitChunks: {
        chunks: `all`,
      },
    },
  };
};
