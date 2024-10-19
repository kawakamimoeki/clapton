import { htmlAttributes } from "../html/html-attributes";
import { Base } from "./base";

export class Element extends Base {
  type: string;

  constructor(type: string, attributes: Record<string, any> = {}) {
    super(attributes)
    this.children = [];
    this.type = type;
  }

  get renderWrapper(): string {
    return `<${this.type} ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</${this.type}>`;
  }
}
