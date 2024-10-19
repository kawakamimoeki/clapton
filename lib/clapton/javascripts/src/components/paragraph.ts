import { htmlAttributes } from "../html/html-attributes";
import { Base } from "./base";

export class Paragraph extends Base {
  get renderWrapper(): string {
    return `<p ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</p>`;
  }
}
