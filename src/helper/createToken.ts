import { TFormElementsState } from "../component/Form/Form";

export type TCalcDateAndToken = () => { date: string; token: string };

export const calcDateAndToken = (): { date: string; token: string } => {
  const date: string = Date.now() + "";

  let str: string = date.substring(date.length - 5);

  let token: string = btoa(`${date}.${str}`);

  return {
    date: date,
    token: token,
  };
};

export const createToken = <T>(
  stateFormElements: TFormElementsState<T>
): string => {
  const elementsValues: string[] = [];

  stateFormElements.forEach((elemDesc, key, map) => {
    if (elemDesc.value) elementsValues.push(elemDesc.value);
  });

  let stringToHash = elementsValues.join("_");

  if (stringToHash.length <= 0) throw new Error("Create token empty values");

  stringToHash = encodeURI(stringToHash).substr(0, 64);

  //console.log(`ALL - ${name + email + phone}`);

  //console.log(`ENCODE - ${stringToHash}`);

  let token = btoa(stringToHash);

  //console.log(`TOKEN - ${token}`);

  if (token.length > 64) {
    token = token.substr(0, 64);
  }

  return token;
};
