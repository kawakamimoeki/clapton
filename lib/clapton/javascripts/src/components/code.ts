import { htmlAttributes } from "../html/html-attributes";

export class Code {
  attributes: Record<string, any>;
  children: any[];

  constructor(attributes: Record<string, any> = {}) {
    this.children = [];
    this.attributes = attributes;
  }

  get renderWrapper(): string {
    return `<code ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</code>`;
  }

  add(child: any): Code {
    this.children.push(child);
    return this;
  }
}
