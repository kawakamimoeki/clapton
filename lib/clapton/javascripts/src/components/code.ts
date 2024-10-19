import { htmlAttributes } from "../html/html-attributes";
import { Base } from "./base";

export class Code extends Base {
  get renderWrapper(): string {
    return `<code ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</code>`;
  }
}
