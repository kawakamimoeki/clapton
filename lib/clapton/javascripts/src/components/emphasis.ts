import { htmlAttributes } from "../html/html-attributes";
import { Base } from "./base";

export class Emphasis extends Base {
  get renderWrapper(): string {
    return `<em ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</em>`;
  }
}
