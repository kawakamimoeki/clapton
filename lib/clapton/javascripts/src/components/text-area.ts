import { htmlAttributes } from "../html/html-attributes";

export class TextArea {
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
    return `<textarea ${htmlAttributes(this.attributes)}>${this.state[this.attribute] || ""}</textarea>`;
  }

  add_action(event: string, klass: string, fn: string, options: { debounce?: number } = {}): TextArea {
    this.attributes["data-action"] = `${this.attributes["data-action"] || ""} ${event}->${klass}#${fn}@${options.debounce || 0}`;
    return this;
  }
}
