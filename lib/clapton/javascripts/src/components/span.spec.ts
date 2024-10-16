import { describe, it, expect } from "vitest"
import { Text } from "./text"
import { Span } from "./span"

describe("Span", () => {
  it("returns empty string if no params", () => {
    expect(new Span().renderWrapper).toBe("<span ></span>")
  })

  it("returns attributes and data attributes", () => {
    expect(new Span({ id: "1", "data-foo": "bar" }).renderWrapper).toBe(`<span id='1' data-foo='bar'></span>`)
  })

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new Span({ id: "1", data: { foo: "bar" } }).renderWrapper).toBe(`<span id='1' data-foo='bar'></span>`)
    expect(new Span({ id: "1", data: { foo: "bar", baz: "qux" } }).renderWrapper).toBe(`<span id='1' data-foo='bar' data-baz='qux'></span>`)
    expect(new Span({ id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).renderWrapper).toBe(`<span id='1' data-foo-baz='qux' data-foo-quux='corge'></span>`)
  })

  it("adds children", () => {
    const text = new Text("Hello")
    const span = new Span()
    span.add(text)
    expect(span.renderWrapper).toBe(`<span >Hello</span>`)
  })
})
