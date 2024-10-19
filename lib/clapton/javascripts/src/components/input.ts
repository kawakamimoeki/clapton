import { htmlAttributes } from "../html/html-attributes";
import { Base } from "./base";

export class Input extends Base {
  state: any;
  attribute: string;

  constructor(state: any, attribute: string, attributes: Record<string, any> = {}) {
    super(attributes)
    this.attribute = attribute;
    this.state = state
    this.attributes["data-attribute"] = attribute;
  }

  get renderWrapper(): string {
    let value = this.state[this.attribute]
    if (this.attributes.type === "datetime-local" && value) {
      value = this.datetime_local_value(value)
    }
    return `<input ${htmlAttributes(this.attributes)} value='${value || ""}'/>`;
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
