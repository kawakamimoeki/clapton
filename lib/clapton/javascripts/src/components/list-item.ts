import { htmlAttributes } from "../html/html-attributes";

export class ListItem {
  attributes: Record<string, any>;
  children: any[];

  constructor(attributes: Record<string, any> = {}) {
    this.children = [];
    this.attributes = attributes;
  }

  add(child: any): this {
    this.children.push(child);
    return this;
  }

  get render(): string {
    return `<li ${htmlAttributes(this.attributes)}>${this.children.map(child => child.render).join("")}</li>`;
  }
}
