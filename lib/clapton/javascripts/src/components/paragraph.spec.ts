import { describe, it, expect } from "vitest"
import { Paragraph } from "./paragraph"
import { Text } from "./text"

describe("Paragraph", () => {
  it("returns empty string if no params", () => {
    expect(new Paragraph().render).toBe("<p ></p>")
  })

  it("returns attributes and data attributes", () => {
    expect(new Paragraph({ id: "1", "data-foo": "bar" }).render).toBe(`<p id='1' data-foo='bar'></p>`)
  })

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new Paragraph({ id: "1", data: { foo: "bar" } }).render).toBe(`<p id='1' data-foo='bar'></p>`)
    expect(new Paragraph({ id: "1", data: { foo: "bar", baz: "qux" } }).render).toBe(`<p id='1' data-foo='bar' data-baz='qux'></p>`)
    expect(new Paragraph({ id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).render).toBe(`<p id='1' data-foo-baz='qux' data-foo-quux='corge'></p>`)
  })

  it("adds children", () => {
    const text = new Text("Hello")
    const paragraph = new Paragraph()
    paragraph.add(text)
    expect(paragraph.render).toBe(`<p >Hello</p>`)
  })
})
