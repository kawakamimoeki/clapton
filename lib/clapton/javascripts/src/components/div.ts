import { htmlAttributes } from "../html/html-attributes";
import { Base } from "./base";

export class Div extends Base {
  get renderWrapper(): string {
    return `<div ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</div>`;
  }  
}
