import { htmlAttributes } from "../html/html-attributes";
import { Base } from "./base";

export class Quote extends Base {
  get renderWrapper(): string {
    return `<q ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</q>`;
  }
}
