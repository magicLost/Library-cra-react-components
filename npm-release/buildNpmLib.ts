import NpmHelper from "./NpmHelper";
import { config } from "./config";
import { resolve } from "path";
import { FileSystemHelper } from "utils-library-lost";

const helper = new NpmHelper(
  new FileSystemHelper(),
  config,
  resolve(__dirname, "..", "dist-lib"),
  resolve(__dirname, "..", "src")
);

helper.run();
