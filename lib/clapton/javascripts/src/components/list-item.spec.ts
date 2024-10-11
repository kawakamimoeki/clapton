import { describe, it, expect } from "vitest"
import { ListItem } from "./list-item"
import { Text } from "./text"

describe("ListItem", () => {
  it("returns empty string if no  params", () => {
    expect(new ListItem().render).toBe("<li ></li>")
  })

  it("returns attributes and data attributes", () => {
    expect(new ListItem({ id: "1", "data-foo": "bar" }).render).toBe(`<li id='1' data-foo='bar'></li>`)
  })  

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new ListItem({ id: "1", data: { foo: "bar" } }).render).toBe(`<li id='1' data-foo='bar'></li>`)
    expect(new ListItem({ id: "1", data: { foo: "bar", baz: "qux" } }).render).toBe(`<li id='1' data-foo='bar' data-baz='qux'></li>`)
    expect(new ListItem({ id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).render).toBe(`<li id='1' data-foo-baz='qux' data-foo-quux='corge'></li>`)
  })

  it("adds children", () => {
    const text = new Text("Hello, world!")
    expect(new ListItem().add(text).render).toBe(`<li >Hello, world!</li>`)
  })
})
