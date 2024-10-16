export class Text {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  get renderWrapper(): string {
    return this.value;
  }
}
