import { htmlAttributes } from "../html/html-attributes";
import { Base } from "./base";

export class Bold extends Base {
  get renderWrapper(): string {
    return `<strong ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</strong>`;
  }
}
