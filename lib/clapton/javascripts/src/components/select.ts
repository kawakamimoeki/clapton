import { htmlAttributes } from "../html/html-attributes";
import { Base } from "./base";

type SelectOption = {
  value: string;
  text: string;
};

export class Select extends Base {
  options: SelectOption[];
  state: any;
  attribute: string;

  constructor(options: SelectOption[] = [], state: any, attribute: string, attributes: Record<string, any> = {}) {
    super(attributes)
    this.options = options;
    this.state = state;
    this.attribute = attribute;
  }

  get renderWrapper(): string {
    return `<select ${htmlAttributes(this.attributes)}>${this.options.map(option => `<option value='${option.value}'${option.value === this.state[this.attribute] ? " selected" : ""}>${option.text}</option>`).join("")}${this.children.map(child => child.renderWrapper).join("")}</select>`;
  }
}
