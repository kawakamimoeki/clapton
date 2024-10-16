import { describe, it, expect } from "vitest"
import { Heading } from "./heading"
import { Text } from "./text"

describe("Heading", () => {
  it("returns empty string if no params", () => {
    expect(new Heading(1).renderWrapper).toBe("<h1 ></h1>")
  })

  it("returns attributes and data attributes", () => {
    expect(new Heading(1, { id: "1", "data-foo": "bar" }).renderWrapper).toBe(`<h1 id='1' data-foo='bar'></h1>`)
  })

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new Heading(1, { id: "1", data: { foo: "bar" } }).renderWrapper).toBe(`<h1 id='1' data-foo='bar'></h1>`)
    expect(new Heading(1, { id: "1", data: { foo: "bar", baz: "qux" } }).renderWrapper).toBe(`<h1 id='1' data-foo='bar' data-baz='qux'></h1>`)
    expect(new Heading(1, { id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).renderWrapper).toBe(`<h1 id='1' data-foo-baz='qux' data-foo-quux='corge'></h1>`)
  })

  it("adds children", () => {
    expect(new Heading(1).add(new Text("Hello")).renderWrapper).toBe(`<h1 >Hello</h1>`)
  })
})
