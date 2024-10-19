import { htmlAttributes } from "../html/html-attributes";
import { Base } from "./base";

export class BlockQuote extends Base {
  get renderWrapper(): string {
    return `<blockquote ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</blockquote>`;
  }
}
