import { htmlAttributes } from "../html/html-attributes";

export class Image {
  attributes: Record<string, any>;
  children: any[];
  src: string;
  alt: string;

  constructor(src: string, alt: string, attributes: Record<string, any> = {}) {
    this.children = [];
    this.attributes = attributes;
    this.src = src;
    this.alt = alt;
  }

  get renderWrapper(): string {
    return `<img src='${this.src}' alt='${this.alt}' ${htmlAttributes(this.attributes)}/>`;
  }
}
