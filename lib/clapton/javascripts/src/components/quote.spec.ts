import { describe, it, expect } from "vitest"
import { Text } from "./text"
import { Quote } from "./quote"

describe("Quote", () => {
  it("returns empty string if no params", () => {
    expect(new Quote().renderWrapper).toBe("<q ></q>")
  })

  it("returns attributes and data attributes", () => {
    expect(new Quote({ id: "1", "data-foo": "bar" }).renderWrapper).toBe(`<q id='1' data-foo='bar'></q>`)
  })

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new Quote({ id: "1", data: { foo: "bar" } }).renderWrapper).toBe(`<q id='1' data-foo='bar'></q>`)
    expect(new Quote({ id: "1", data: { foo: "bar", baz: "qux" } }).renderWrapper).toBe(`<q id='1' data-foo='bar' data-baz='qux'></q>`)
    expect(new Quote({ id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).renderWrapper).toBe(`<q id='1' data-foo-baz='qux' data-foo-quux='corge'></q>`)
  })

  it("adds children", () => {
    const text = new Text("Hello")
    const quote = new Quote()
    quote.add(text)
    expect(quote.renderWrapper).toBe(`<q >Hello</q>`)
  })
})
