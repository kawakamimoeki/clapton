import { describe, it, expect } from "vitest"
import { List } from "./list"
import { ListItem } from "./list-item"
import { Text } from "./text"

describe("List", () => {
  it("returns empty string if no params", () => {
    expect(new List().renderWrapper).toBe("<ul ></ul>")
  })

  it("returns attributes and data attributes", () => {
    expect(new List({ id: "1", "data-foo": "bar" }).renderWrapper).toBe(`<ul id='1' data-foo='bar'></ul>`)
  })  

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new List({ id: "1", data: { foo: "bar" } }).renderWrapper).toBe(`<ul id='1' data-foo='bar'></ul>`)
    expect(new List({ id: "1", data: { foo: "bar", baz: "qux" } }).renderWrapper).toBe(`<ul id='1' data-foo='bar' data-baz='qux'></ul>`)
    expect(new List({ id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).renderWrapper).toBe(`<ul id='1' data-foo-baz='qux' data-foo-quux='corge'></ul>`)
  })

  it("adds children", () => {
    const listItem = new ListItem()
    listItem.add(new Text("Hello, world!"))
    expect(new List().add(listItem).renderWrapper).toBe(`<ul ><li >Hello, world!</li></ul>`)
  })
})
