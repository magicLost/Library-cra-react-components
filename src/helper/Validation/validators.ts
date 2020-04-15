import ValidationError from "./ValidationError";

/* export type VALIDATOR_TYPES =
  | "IS_STRING"
  | "IS_FILE"
  | "IS_FILE_LIST"
  | "IS_ARRAY"
  | "IS_IN_ARRAY"
  | "IS_LONGER_THAN"
  | "IS_SHORTER_THAN"
  | "IS_MATCH_REGEX"
  | "IS_VALID_FILE_TYPE"
  | "IS_FILESIZE_SMALLER_THAN"; */

export type isRight<T> = (value: T) => boolean;

export const isString: isRight<any> = value => {
  return typeof value === "string";
};

export const isFile: isRight<any> = value => {
  return typeof value === "object" && value instanceof File;
};

export const isFileList: isRight<any> = value => {
  return typeof value === "object" && value instanceof FileList;
};

export const isArray: isRight<any> = value => {
  return Array.isArray(value);
};

export const isBlank: isRight<string> = value => {
  return value.length === 0;
};

export const isInArray: <T>(value: T, array: T[]) => boolean = (
  value,
  array
): boolean => {
  for (let val of array) {
    if (val === value) return true;
  }

  return false;
};

export const isLongerThan = (value: string, arg: number): boolean => {
  return value.length >= arg;
};

export const isShorterThan = (value: string, arg: number): boolean => {
  return value.length < arg;
};

export const isFileSizeSmallerThan = (file: File, maxSize: number): boolean => {
  return file.size > maxSize;
};

export const isValidFileType = (file: File, types: string[]): boolean => {
  const fileType = file.type;

  return isInArray<string>(fileType, types);
};

export const isMatchRegex = (value: string, pattern: RegExp) => {
  //if(!isString(value)) throw new ValidationError("We need string...");

  if (value === "") throw new ValidationError("Empty value...");

  const match = value.match(pattern);

  if (match === null) {
    return false;
  } else if (match[0] !== value) {
    return false;
  }

  return true;
};
