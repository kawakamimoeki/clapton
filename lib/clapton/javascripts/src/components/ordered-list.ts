import { htmlAttributes } from "../html/html-attributes";

export class OrderedList {
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

  get renderWrapper(): string {
    return `<ol ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</ol>`;
  }
}
