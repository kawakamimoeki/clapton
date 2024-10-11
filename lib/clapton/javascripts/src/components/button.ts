import { htmlAttributes } from "../html/html-attributes";

export class Button {
  attributes: Record<string, any>;
  children: any[];

  constructor(attributes: Record<string, any> = {}) {
    this.attributes = attributes;
    this.children = [];
  }

  add(child: any): Button {
    this.children.push(child);
    return this;
  }

  get render(): string {
    return `<button ${htmlAttributes(this.attributes)}>${this.children.map(child => child.render).join("")}</button>`;
  }

  add_action(event: string, klass: string, fn: string, options: Record<string, any> = {}): Button {
    this.attributes["data-action"] = `${this.attributes["data-action"] || ""} ${event}->${klass}#${fn}@${options.debounce || 0}`;
    return this;
  }
}
