import { htmlAttributes } from "../html/html-attributes";
import { Base } from "./base";

export class Span extends Base {
  get renderWrapper(): string {
    return `<span ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</span>`;
  }
}
