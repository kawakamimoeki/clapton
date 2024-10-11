import { htmlAttributes } from "../html/html-attributes";

export class RadioButton {
  state: any;
  attribute: string;
  attributes: Record<string, any>;

  constructor(state: any, attribute: string, attributes: Record<string, any> = {}) {
    this.state = state;
    this.attributes = attributes;
    this.attribute = attribute;
    this.attributes["data-attribute"] = attribute;
  }

  get render(): string {
    return `<input type='radio' ${htmlAttributes(this.attributes)} value='${this.state[this.attribute] || ""}'/>`;
  }

  add_action(event: string, klass: string, fn: string, options: { debounce?: number } = {}): RadioButton {
    this.attributes["data-action"] = `${this.attributes["data-action"] || ""} ${event}->${klass}#${fn}@${options.debounce || 0}`;
    return this;
  }
}
