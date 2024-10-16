import { describe, it, expect } from "vitest"
import { Emphasis } from "./emphasis"
import { Text } from "./text"

describe("Emphasis", () => {
  it("returns empty string if no params", () => {
    expect(new Emphasis().renderWrapper).toBe("<em ></em>")
  })

  it("returns attributes and data attributes", () => {
    expect(new Emphasis({ id: "1", "data-foo": "bar" }).renderWrapper).toBe(`<em id='1' data-foo='bar'></em>`)
  })

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new Emphasis({ id: "1", data: { foo: "bar" } }).renderWrapper).toBe(`<em id='1' data-foo='bar'></em>`)
    expect(new Emphasis({ id: "1", data: { foo: "bar", baz: "qux" } }).renderWrapper).toBe(`<em id='1' data-foo='bar' data-baz='qux'></em>`)
    expect(new Emphasis({ id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).renderWrapper).toBe(`<em id='1' data-foo-baz='qux' data-foo-quux='corge'></em>`)
  })

  it("adds children", () => {
    const text = new Text("Hello")
    const emphasis = new Emphasis()
    emphasis.add(text)
    expect(emphasis.renderWrapper).toBe(`<em >Hello</em>`)
  })
})
