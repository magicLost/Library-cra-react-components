import { IValidatorDesc } from "../../data/feedback_forms_data";
import {
  VALIDATOR_TYPES,
  regex,
  length,
  fileSize,
  fileType
} from "./form_validators";
import ValidationError from "./ValidationError";

export interface IFormValidatorChain {
  getErrorMessages: () => string[];
  isValid: (value: any, validators: IValidatorDesc[]) => boolean;
}

export default class FormValidatorChain implements IFormValidatorChain {
  protected errors: string[] = [];

  //getValidator: (type: VALIDATOR_TYPES) => Validator<any, any>;
  getErrorMessages = () => this.errors;

  isValid = (value: any, validators: IValidatorDesc[]) => {
    let error = "";
    this.errors = [];

    for (let validator of validators) {
      switch (validator.name) {
        case VALIDATOR_TYPES.REGEX:
          if ((error = regex(value, validator.options)) !== "")
            this.errors.push(error);
          break;

        case VALIDATOR_TYPES.LENGTH:
          if ((error = length(value, validator.options)) !== "")
            this.errors.push(error);
          break;

        case VALIDATOR_TYPES.FILE_TYPE:
          if ((error = fileType(value, validator.options)) !== "")
            this.errors.push(error);
          break;

        case VALIDATOR_TYPES.FILE_SIZE:
          if ((error = fileSize(value, validator.options)) !== "")
            this.errors.push(error);
          break;

        default:
          throw new ValidationError("Bad validator name  - " + validator.name);
      }
    }

    if (this.errors.length > 0) return false;

    return true;
  };
}
