import { htmlAttributes } from "../html/html-attributes";

export class Form {
  attributes: Record<string, any>;
  children: any[];

  constructor(attributes: Record<string, any> = {}) {
    this.children = [];
    this.attributes = attributes;
  }

  get renderWrapper(): string {
    return `<form ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</form>`;
  }

  add(child: any): Form {
    this.children.push(child);
    return this;
  }
}
