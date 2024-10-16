import { htmlAttributes } from "../html/html-attributes";

export class Quote {
  attributes: Record<string, any>;
  children: any[];

  constructor(attributes: Record<string, any> = {}) {
    this.children = [];
    this.attributes = attributes;
  }

  get renderWrapper(): string {
    return `<q ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</q>`;
  }

  add(child: any): Quote {
    this.children.push(child);
    return this;
  }
}
