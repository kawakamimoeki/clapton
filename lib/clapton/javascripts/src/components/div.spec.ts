import { describe, it, expect } from "vitest"
import { Div } from "./div"
import { Text } from "./text"

describe("Div", () => {
  it("returns empty string if no params", () => {
    expect(new Div().renderWrapper).toBe("<div ></div>")
  })

  it("returns attributes and data attributes", () => {
    expect(new Div({ id: "1", "data-foo": "bar" }).renderWrapper).toBe(`<div id='1' data-foo='bar'></div>`)
  })

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new Div({ id: "1", data: { foo: "bar" } }).renderWrapper).toBe(`<div id='1' data-foo='bar'></div>`)
    expect(new Div({ id: "1", data: { foo: "bar", baz: "qux" } }).renderWrapper).toBe(`<div id='1' data-foo='bar' data-baz='qux'></div>`)
    expect(new Div({ id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).renderWrapper).toBe(`<div id='1' data-foo-baz='qux' data-foo-quux='corge'></div>`)
  })

  it("adds children", () => {
    expect(new Div().add(new Text("Hello, world!")).renderWrapper).toBe(`<div >Hello, world!</div>`)
  })
})
