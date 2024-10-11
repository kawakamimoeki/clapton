import { htmlAttributes } from "../html/html-attributes";

export class Form {
  attributes: Record<string, any>;
  children: any[];

  constructor(attributes: Record<string, any> = {}) {
    this.children = [];
    this.attributes = attributes;
  }

  get render(): string {
    return `<form ${htmlAttributes(this.attributes)}>${this.children.map(child => child.render).join("")}</form>`;
  }

  add(child: any): Form {
    this.children.push(child);
    return this;
  }
}
