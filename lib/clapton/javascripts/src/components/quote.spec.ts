import { describe, it, expect } from "vitest"
import { Text } from "./text"
import { Quote } from "./quote"

describe("Quote", () => {
  it("returns empty string if no params", () => {
    expect(new Quote().render).toBe("<q ></q>")
  })

  it("returns attributes and data attributes", () => {
    expect(new Quote({ id: "1", "data-foo": "bar" }).render).toBe(`<q id='1' data-foo='bar'></q>`)
  })

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new Quote({ id: "1", data: { foo: "bar" } }).render).toBe(`<q id='1' data-foo='bar'></q>`)
    expect(new Quote({ id: "1", data: { foo: "bar", baz: "qux" } }).render).toBe(`<q id='1' data-foo='bar' data-baz='qux'></q>`)
    expect(new Quote({ id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).render).toBe(`<q id='1' data-foo-baz='qux' data-foo-quux='corge'></q>`)
  })

  it("adds children", () => {
    const text = new Text("Hello")
    const quote = new Quote()
    quote.add(text)
    expect(quote.render).toBe(`<q >Hello</q>`)
  })
})
