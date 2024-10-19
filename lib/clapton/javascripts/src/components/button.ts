import { htmlAttributes } from "../html/html-attributes";
import { Base } from "./base";

export class Button extends Base {
  get renderWrapper(): string {
    return `<button ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</button>`;
  }
}
