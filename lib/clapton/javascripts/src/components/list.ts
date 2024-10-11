import { htmlAttributes } from "../html/html-attributes";

export class List {
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
    return `<ul ${htmlAttributes(this.attributes)}>${this.children.map(child => child.render).join("")}</ul>`;
  }
}
