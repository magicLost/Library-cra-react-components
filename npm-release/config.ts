export interface INpmConfig {
  version: string;
  excludeDirs: string[];
  excludeFiles: string[];
}

export const config: INpmConfig = {
  version: "1.0.2",

  excludeDirs: ["utils"],

  excludeFiles: [
    "index.tsx",
    "index.css",
    "App.tsx",
    "App.test.tsx",
    "App.css",
    "logo.svg",
    "react-app-env.d.ts",
    "serviceWorker.ts",
    "setupTests.ts",
  ],
};
