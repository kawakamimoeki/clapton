export class Base {
  attributes: Record<string, any>;
  children: any[];

  constructor(attributes: Record<string, any> = {}) {
    this.children = [];
    this.attributes = attributes;
  }

  add(child: any): Base {
    this.children.push(child);
    return this;
  }

  add_action(eventType: string, stateName: string, fnName: string, options: Record<string, any> = {}): this {
    this.attributes["data-action"] = `${this.attributes["data-action"] || ""} ${eventType}->${stateName}#${fnName}@${options.debounce || 0}`;
    return this;
  }
  
  get renderWrapper() {
    return "";
  }
}
