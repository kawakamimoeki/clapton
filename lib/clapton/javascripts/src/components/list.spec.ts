import { describe, it, expect } from "vitest"
import { List } from "./list"
import { ListItem } from "./list-item"
import { Text } from "./text"

describe("List", () => {
  it("returns empty string if no params", () => {
    expect(new List().render).toBe("<ul ></ul>")
  })

  it("returns attributes and data attributes", () => {
    expect(new List({ id: "1", "data-foo": "bar" }).render).toBe(`<ul id='1' data-foo='bar'></ul>`)
  })  

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new List({ id: "1", data: { foo: "bar" } }).render).toBe(`<ul id='1' data-foo='bar'></ul>`)
    expect(new List({ id: "1", data: { foo: "bar", baz: "qux" } }).render).toBe(`<ul id='1' data-foo='bar' data-baz='qux'></ul>`)
    expect(new List({ id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).render).toBe(`<ul id='1' data-foo-baz='qux' data-foo-quux='corge'></ul>`)
  })

  it("adds children", () => {
    const listItem = new ListItem()
    listItem.add(new Text("Hello, world!"))
    expect(new List().add(listItem).render).toBe(`<ul ><li >Hello, world!</li></ul>`)
  })
})
