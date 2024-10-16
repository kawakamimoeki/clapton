import { htmlAttributes } from "../html/html-attributes";

export class Bold {
  attributes: Record<string, any>;
  children: any[];

  constructor(attributes: Record<string, any> = {}) {
    this.children = [];
    this.attributes = attributes;
  }

  get renderWrapper(): string {
    return `<strong ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</strong>`;
  }

  add(child: any): Bold {
    this.children.push(child);
    return this;
  }
}
