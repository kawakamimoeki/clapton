import { Box } from "./box";
import { Presets } from "./presets";

export class Component {
  id: string;
  _state: any;
  _errors: any[];
  _c: Presets;

  constructor(state: any = {}, id: string = Math.random().toString(36).substring(2, 10), errors: any[] = []) {
    this._state = state;
    this.id = id;
    this._errors = errors;
    this._c = new Presets()
  }

  get render(): any {
    return new Box({});
  }

  get renderWrapper(): string {
    const root = this.render;
    root.attributes = { ...root.attributes, data: { ...root.attributes.data, component: this.constructor.name, state: JSON.stringify(this._state), id: this.id, errors: this._errors } };
    return root.renderWrapper;
  }
}
