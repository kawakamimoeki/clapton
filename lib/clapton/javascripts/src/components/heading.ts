import { htmlAttributes } from "../html/html-attributes";

export class Heading {
  attributes: Record<string, any>;
  children: any[];
  level: number;
  constructor(level: number, attributes: Record<string, any> = {}) {
    this.children = [];
    this.level = level;
    this.attributes = attributes;
  }

  get renderWrapper(): string {
    return `<h${this.level} ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</h${this.level}>`;
  }

  add(child: any): Heading {
    this.children.push(child);
    return this;
  }
}
