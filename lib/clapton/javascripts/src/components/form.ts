import { htmlAttributes } from "../html/html-attributes";
import { Base } from "./base";

export class Form extends Base {
  get renderWrapper(): string {
    return `<form ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</form>`;
  }
}
