import path from "path";
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildMode, BuildPaths } from "./config/build/types/types";
import webpack from "webpack";

interface EnvVariables {
  mode: BuildMode;
  port: number;
}

const pages = [
  { name: "index", folder: "index" },
  { name: "cards", folder: "cards" },
  { name: "colorsType", folder: "colors-type" },
  { name: "formElements", folder: "form-elements" },
  { name: "headersFooters", folder: "headers-footers" },
  { name: "roomDetails", folder: "room-details" },
  { name: "searchRoom", folder: "search-room" },
  { name: "userLogin", folder: "user-login" },
  { name: "userRegistration", folder: "user-registration" },
];

export default (env: EnvVariables) => {
  const pagesData = pages.reduce(
    (acc, page) => {
      acc[page.name] = path.resolve(
        __dirname,
        "src",
        "partials",
        "pages",
        page.folder,
        `${page.folder}.pug`,
      );
      return acc;
    },
    {} as Record<string, string>,
  );

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    entry: path.resolve(__dirname, "src", "js", "main.js"),
    output: path.resolve(__dirname, "build"),
    pagesData,
  });

  return config;
};
