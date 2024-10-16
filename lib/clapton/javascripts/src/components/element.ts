import { htmlAttributes } from "../html/html-attributes";

export class Element {
  attributes: Record<string, any>;
  children: any[];
  type: string;

  constructor(type: string, attributes: Record<string, any> = {}) {
    this.children = [];
    this.type = type;
    this.attributes = attributes;
  }

  get renderWrapper(): string {
    return `<${this.type} ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</${this.type}>`;
  }

  add(child: any): Element {
    this.children.push(child);
    return this;
  }
}
