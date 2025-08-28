import path from "path";
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildMode, BuildPaths } from "./config/build/types/types";
import webpack from "webpack";

interface EnvVariables {
  mode: BuildMode;
  port: number;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "js", "main.js"),
    output: path.resolve(__dirname, "build"),
    index: path.resolve(
      __dirname,
      "src",
      "partials",
      "pages",
      "index",
      "index.pug",
    ),
    cards: path.resolve(
      __dirname,
      "src",
      "partials",
      "pages",
      "cards",
      "cards.pug",
    ),
    colorsType: path.resolve(
      __dirname,
      "src",
      "partials",
      "pages",
      "colors-type",
      "colors-type.pug",
    ),
    formElements: path.resolve(
      __dirname,
      "src",
      "partials",
      "pages",
      "form-elements",
      "form-elements.pug",
    ),
    headersFooters: path.resolve(
      __dirname,
      "src",
      "partials",
      "pages",
      "headers-footers",
      "headers-footers.pug",
    ),
    roomDetails: path.resolve(
      __dirname,
      "src",
      "partials",
      "pages",
      "room-details",
      "room-details.pug",
    ),
    searchRoom: path.resolve(
      __dirname,
      "src",
      "partials",
      "pages",
      "search-room",
      "search-room.pug",
    ),
    userLogin: path.resolve(
      __dirname,
      "src",
      "partials",
      "pages",
      "user-login",
      "user-login.pug",
    ),
    userRegistration: path.resolve(
      __dirname,
      "src",
      "partials",
      "pages",
      "user-registration",
      "user-registration.pug",
    ),
  };
  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    paths,
  });
  return config;
};
