import { htmlAttributes } from "../html/html-attributes";
import { Base } from "./base";

export class Heading extends Base {
  level: number;

  constructor(level: number, attributes: Record<string, any> = {}) {
    super(attributes)
    this.level = level;
  }

  get renderWrapper(): string {
    return `<h${this.level} ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</h${this.level}>`;
  }
}
