import { htmlAttributes } from "../html/html-attributes";

export class Link {
  attributes: Record<string, any>;
  children: any[];
  href: string;
  constructor(href: string, attributes: Record<string, any> = {}) {
    this.children = [];
    this.attributes = attributes;
    this.href = href;
  }

  get renderWrapper(): string {
    return `<a href='${this.href}' ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</a>`;
  }

  add(child: any): Link {
    this.children.push(child);
    return this;
  }
}
