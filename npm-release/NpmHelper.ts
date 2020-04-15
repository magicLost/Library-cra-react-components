//import FileSystemHelper from "../src/utils/FileSystemHelper/FileSystemHelper";
import { FileSystemHelper } from "utils-library-lost";
import { INpmConfig } from "./config";
import { resolve } from "path";

class NpmHelper {
  fs: FileSystemHelper;
  pathToLibBuildDir: string;
  pathToSrc: string;
  config: INpmConfig;

  constructor(
    fs: FileSystemHelper,
    config: INpmConfig,
    pathToLibBuildDir: string,
    pathToSrc: string
  ) {
    this.fs = fs;
    this.config = config;
    this.pathToLibBuildDir = pathToLibBuildDir;
    this.pathToSrc = pathToSrc;
  }

  run = async () => {
    try {
      //delete old dir
      if (this.fs.isPathExists(this.pathToLibBuildDir)) {
        await this.fs.deleteDir(this.pathToLibBuildDir);
      }

      //copy src dir
      await this.fs.makeDir(this.pathToLibBuildDir);
      await this.fs.copyDir(this.pathToSrc, this.pathToLibBuildDir);

      //delete unused files
      this.config.excludeFiles.forEach((fileName: string) => {
        if (this.fs.isPathExists(resolve(this.pathToLibBuildDir, fileName))) {
          this.fs.deleteFile(resolve(this.pathToLibBuildDir, fileName));
        }
      });

      this.config.excludeDirs.forEach((dirName: string) => {
        if (this.fs.isPathExists(resolve(this.pathToLibBuildDir, dirName))) {
          this.fs.deleteDir(resolve(this.pathToLibBuildDir, dirName));
        }
      });

      //create new package.json file
      let data = await this.fs.readFile(
        resolve(__dirname, "templates", "package.template.json")
      );

      if (data) data = data.replace("!!!VERSION!!!", this.config.version);

      this.fs.writeFile(
        resolve(this.pathToLibBuildDir, "package.json"),
        data as string
      );

      //copy index.js
      this.fs.copyFile(
        resolve(__dirname, "templates", "index.template.js"),
        resolve(this.pathToLibBuildDir, "index.js")
      );

      //create index.d.ts
      this.fs.copyFile(
        resolve(__dirname, "templates", "index.template.js"),
        resolve(this.pathToLibBuildDir, "index.d.ts")
      );

      //copy README.md
      this.fs.copyFile(
        resolve(__dirname, "templates", "README.md"),
        resolve(this.pathToLibBuildDir, "README.md")
      );
    } catch (error) {
      console.error(error.message);
    }
  };
}

export default NpmHelper;
