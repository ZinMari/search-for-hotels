import path from "path";
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildMode, BuildPaths } from "./config/build/types/types";
import webpack from "webpack";

interface EnvVariables {
  mode: BuildMode;
  port: number;
}

interface Page {
  name: keyof BuildPaths;
  filename: string;
}

const pages: Page[] = [
  { name: "index", filename: "index.pug" },
  { name: "cards", filename: "cards.pug" },
  { name: "colorsType", filename: "colors-type.pug" },
  { name: "formElements", filename: "form-elements.pug" },
  { name: "headersFooters", filename: "headers-footers.pug" },
  { name: "roomDetails", filename: "room-details.pug" },
  { name: "searchRoom", filename: "search-room.pug" },
  { name: "userLogin", filename: "user-login.pug" },
  { name: "userRegistration", filename: "user-registration.pug" },
];

export default (env: EnvVariables) => {
  const basePaths: Partial<BuildPaths> = {
    entry: path.resolve(__dirname, "src", "js", "main.js"),
    output: path.resolve(__dirname, "build"),
  };

  const pagePaths: Partial<BuildPaths> = pages.reduce(
    (acc, { name, filename }) => {
      acc[name] = path.resolve(
        __dirname,
        `src/partials/pages/${name}/${filename}`,
      );
      return acc;
    },
    {} as Partial<BuildPaths>,
  );

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    paths: { ...basePaths, ...pagePaths },
  });
  return config;
};
