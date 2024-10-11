export class Text {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  get render(): string {
    return this.value;
  }
}
