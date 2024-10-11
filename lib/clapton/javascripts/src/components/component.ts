import { Box } from "./box";

export class Component {
  id: string;
  _state: any;
  _errors: any[];
  _root: Box;

  constructor(state: any = {}, id: string = Math.random().toString(36).substring(2, 10), errors: any[] = []) {
    this._state = state;
    this.id = id;
    this._errors = errors;
    this._root = new Box({ data: { component: this.constructor.name, state: JSON.stringify(this._state), id: this.id, errors: this._errors } });
  }

  get render(): string {
    return this._root.render;
  }
}
