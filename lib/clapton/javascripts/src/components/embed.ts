export class Embed {
  html: string;

  constructor(html: string) {
    this.html = html;
  }

  get renderWrapper(): string {
    return this.html;
  }
}
