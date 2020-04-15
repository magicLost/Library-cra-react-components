import { isFile, isInArray, isString } from "./validators";
import ValidationError from "./ValidationError";

type FormValidator<T, U> = (value: T, options: U) => string;

export interface IFormValidatorOptions {
  errorMessage: string;
  min?: number;
  max?: number;
  fileTypes?: string[];
  fileMaxSize?: number;
  pattern?: RegExp;
}
/* 
export interface ILengthValidatorOptions extends IFormValidatorOptions{
    min: number | undefined;
    max: number | undefined;
}

export interface IFileTypeValidatorOptions extends IFormValidatorOptions{
    types: string[];
}

export interface IFileSizeValidatorOptions extends IFormValidatorOptions{
    maxSize: number;
}

export interface IRegexValidatorOptions extends IFormValidatorOptions{
    pattern: RegExp;
} */

export enum VALIDATOR_TYPES {
  REGEX,
  LENGTH,
  FILE_TYPE,
  FILE_SIZE
}

export const length: FormValidator<string, IFormValidatorOptions> = (
  value,
  options
) => {
  if (!isString(value)) throw new ValidationError("We need string...");

  const length = value.length;

  if (options.min !== undefined) {
    if (length < options.min) return options.errorMessage;
  }

  if (options.max !== undefined) {
    if (length > options.max) return options.errorMessage;
  }

  return "";
};

export const regex: FormValidator<string, IFormValidatorOptions> = (
  value,
  options
) => {
  if (!isString(value)) throw new ValidationError("We need string...");

  if (options.pattern === undefined) throw new ValidationError("No pattern...");

  const match = value.match(options.pattern);

  if (match === null) {
    return options.errorMessage;
  } else if (match[0] !== value) {
    return options.errorMessage;
  }

  return "";
};

export const fileType: FormValidator<File, IFormValidatorOptions> = (
  file,
  options
) => {
  if (!isFile(file)) throw new ValidationError("We need File instance...");

  if (options.fileTypes === undefined)
    throw new ValidationError("No fileTypes...");

  const fileType = file.type;

  if (!isInArray<string>(fileType, options.fileTypes))
    return options.errorMessage;

  return "";
};

export const fileSize: FormValidator<File, IFormValidatorOptions> = (
  file,
  options
) => {
  if (!isFile(file)) throw new ValidationError("We need File instance...");

  if (options.fileMaxSize === undefined)
    throw new ValidationError("No fileMaxSize...");

  if (file.size > options.fileMaxSize) return options.errorMessage;

  return "";
};
