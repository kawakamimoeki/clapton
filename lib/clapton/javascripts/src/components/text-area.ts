import { htmlAttributes } from "../html/html-attributes";
import { Base } from "./base";

export class TextArea extends Base {
  state: any;
  attribute: string;

  constructor(state: any, attribute: string, attributes: Record<string, any> = {}) {
    super(attributes)
    this.attribute = attribute;
    this.state = state
    this.attributes["data-attribute"] = attribute;
  }

  get renderWrapper(): string {
    return `<textarea ${htmlAttributes(this.attributes)}>${this.state[this.attribute] || ""}</textarea>`;
  }
}
