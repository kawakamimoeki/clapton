import { htmlAttributes } from "../html/html-attributes";
import { Base } from "./base";

export class Link extends Base {
  get renderWrapper(): string {
    return `<a ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</a>`;
  }
}
