import { htmlAttributes } from "../html/html-attributes";
import { Base } from "./base";

export class OrderedList extends Base {
  get renderWrapper(): string {
    return `<ol ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</ol>`;
  }
}
