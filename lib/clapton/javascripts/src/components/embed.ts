export class Embed {
  html: string;

  constructor(html: string) {
    this.html = html;
  }

  get render(): string {
    return this.html;
  }
}
