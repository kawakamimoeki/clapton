import { htmlAttributes } from "../html/html-attributes";
import { Base } from "./base";

export class Image extends Base {
  get renderWrapper(): string {
    return `<img ${htmlAttributes(this.attributes)}/>`;
  }
}
