import { htmlAttributes } from "../html/html-attributes";
import { Base } from "./base";

export class List extends Base {
  get renderWrapper(): string {
    return `<ul ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</ul>`;
  }
}
