import { htmlAttributes } from "../html/html-attributes";

export class Span {
  attributes: Record<string, any>;
  children: any[];

  constructor(attributes: Record<string, any> = {}) {
    this.children = [];
    this.attributes = attributes;
  }

  get renderWrapper(): string {
    return `<span ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</span>`;
  }

  add(child: any): Span {
    this.children.push(child);
    return this;
  }
}
