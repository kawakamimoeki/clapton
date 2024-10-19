import { htmlAttributes } from "../html/html-attributes";
import { Base } from "./base";

export class ListItem extends Base {
  get renderWrapper(): string {
    return `<li ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</li>`;
  }
}
