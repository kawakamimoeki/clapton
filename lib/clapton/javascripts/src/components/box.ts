import { htmlAttributes } from "../html/html-attributes";

export class Box {
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

  get render(): string {
    return `<div ${htmlAttributes(this.attributes)}>${this.children.map(child => child.render).join("")}</div>`;
  }

  add_action(eventType: string, stateName: string, fnName: string, options: Record<string, any> = {}): this {
    this.attributes["data-action"] = `${this.attributes["data-action"] || ""} ${eventType}->${stateName}#${fnName}@${options.debounce || 0}`;
    return this;
  }
}
