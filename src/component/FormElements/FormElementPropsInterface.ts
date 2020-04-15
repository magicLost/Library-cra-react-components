//import { TElementAttrs } from "./../../data/feedback_forms_data";

export type TElementAttrs = {
  type?: string;
  id: string;
  placeholder?: string;
};

export interface FormElementProps {
  elementAttrs: TElementAttrs;
  value: string;
  name: string;
  labelValue: string;
  onChange: (event: any) => void;
  disabled?: boolean;
}
