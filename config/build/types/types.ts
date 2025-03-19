export interface BuildPaths {
  entry: string;
  output: string;
  index: string;
  cards: string;
  colorsType: string;
  formElements: string;
  headersFooters: string;
  roomDetails: string;
  searchRoom: string;
  userLogin: string;
  userRegistration: string;
}

export type BuildMode = 'production' | 'development';

export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
}
