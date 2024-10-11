import { htmlAttributes } from "../html/html-attributes";

export class Paragraph {
  attributes: Record<string, any>;
  children: any[];

  constructor(attributes: Record<string, any> = {}) {
    this.children = [];
    this.attributes = attributes;
  }

  get render(): string {
    return `<p ${htmlAttributes(this.attributes)}>${this.children.map(child => child.render).join("")}</p>`;
  }

  add(child: any): Paragraph {
    this.children.push(child);
    return this;
  }
}
