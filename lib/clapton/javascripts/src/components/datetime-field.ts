import { htmlAttributes } from "../html/html-attributes";

export class DateTimeField {
  state: any;
  attribute: string;
  attributes: Record<string, any> = {};

  constructor(state: any, attribute: string, attributes: Record<string, any> = {}) {
    this.state = state;
    this.attribute = attribute;
    this.attributes = attributes;
    this.attributes["data-attribute"] = attribute;
  }

  get renderWrapper(): string {
    const value = this.state[this.attribute] ? this.datetime_local_value(this.state[this.attribute]) : "";
    return `<input type='datetime-local' ${htmlAttributes(this.attributes)} value='${value}'/>`;
  }

  add_action(event: string, klass: string, fn: string, options: { debounce?: number } = {}): DateTimeField {
    this.attributes["data-action"] = `${this.attributes["data-action"] || ""} ${event}->${klass}#${fn}@${options.debounce || 0}`;
    return this;
  }

  datetime_local_value(value: string): string {
    if (!value) {
      return "";
    }
    const date = new Date(value);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();
    let hours: string | number = date.getHours();
    let minutes: string | number = date.getMinutes();
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${date.getFullYear()}-${month}-${day}T${hours}:${minutes}`;
  }
}
