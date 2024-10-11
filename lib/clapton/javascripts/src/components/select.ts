import { htmlAttributes } from "../html/html-attributes";

type SelectOption = {
  value: string;
  text: string;
};

export class Select {
  attributes: Record<string, any>;
  children: any[];
  options: SelectOption[];
  state: any;
  attribute: string;

  constructor(options: SelectOption[] = [], state: any, attribute: string, attributes: Record<string, any> = {}) {
    this.children = [];
    this.options = options;
    this.state = state;
    this.attribute = attribute;
    this.attributes = attributes;
  }

  get render(): string {
    return `<select ${htmlAttributes(this.attributes)}>${this.options.map(option => `<option value='${option.value}'${option.value === this.state[this.attribute] ? " selected" : ""}>${option.text}</option>`).join("")}${this.children.map(child => child.render).join("")}</select>`;
  }
}
