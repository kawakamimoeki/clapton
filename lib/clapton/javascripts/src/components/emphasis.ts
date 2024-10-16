import { htmlAttributes } from "../html/html-attributes";

export class Emphasis {
  attributes: Record<string, any>;
  children: any[];

  constructor(attributes: Record<string, any> = {}) {
    this.children = [];
    this.attributes = attributes;
  }

  get renderWrapper(): string {
    return `<em ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</em>`;
  }

  add(child: any): Emphasis {
    this.children.push(child);
    return this;
  }
}
