import { describe, it, expect } from "vitest"
import { Image } from "./image"

describe("Image", () => {
  it("returns empty string if no params", () => {
    expect(new Image({ src: "https://example.com/image.png", alt: "" }).renderWrapper).toBe("<img src='https://example.com/image.png' alt=''/>")
  })

  it("returns attributes and data attributes", () => {
    expect(new Image({ src: "https://example.com/image.png", alt: "test", id: "1", "data-foo": "bar" }).renderWrapper).toBe(`<img src='https://example.com/image.png' alt='test' id='1' data-foo='bar'/>`)
  })
})
