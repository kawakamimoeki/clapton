import { describe, it, expect } from "vitest"
import { BlockQuote } from "./block-quote"
import { Text } from "./text"

describe("BlockQuote", () => {
  it("returns empty string if no params", () => {
    expect(new BlockQuote().renderWrapper).toBe("<blockquote ></blockquote>")
  })

  it("returns attributes and data attributes", () => {
    expect(new BlockQuote({ id: "1", "data-foo": "bar" }).renderWrapper).toBe(`<blockquote id='1' data-foo='bar'></blockquote>`)
  })

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new BlockQuote({ id: "1", data: { foo: "bar" } }).renderWrapper).toBe(`<blockquote id='1' data-foo='bar'></blockquote>`)
    expect(new BlockQuote({ id: "1", data: { foo: "bar", baz: "qux" } }).renderWrapper).toBe(`<blockquote id='1' data-foo='bar' data-baz='qux'></blockquote>`)
    expect(new BlockQuote({ id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).renderWrapper).toBe(`<blockquote id='1' data-foo-baz='qux' data-foo-quux='corge'></blockquote>`)
  })

  it("adds children", () => {
    const text = new Text("Hello")
    const blockQuote = new BlockQuote()
    blockQuote.add(text)
    expect(blockQuote.renderWrapper).toBe(`<blockquote >Hello</blockquote>`)
  })
})
