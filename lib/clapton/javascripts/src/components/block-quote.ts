import { htmlAttributes } from "../html/html-attributes";

export class BlockQuote {
  attributes: Record<string, any>;
  children: any[];

  constructor(attributes: Record<string, any> = {}) {
    this.children = [];
    this.attributes = attributes;
  }

  get renderWrapper(): string {
    return `<blockquote ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</blockquote>`;
  }

  add(child: any): BlockQuote {
    this.children.push(child);
    return this;
  }
}
