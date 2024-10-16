import { describe, it, expect } from "vitest"
import { OrderedList } from "./ordered-list"
import { ListItem } from "./list-item"
import { Text } from "./text"

describe("OrderedList", () => {
  it("returns empty string if no params", () => {
    expect(new OrderedList().renderWrapper).toBe("<ol ></ol>")
  })

  it("returns attributes and data attributes", () => {
    expect(new OrderedList({ id: "1", "data-foo": "bar" }).renderWrapper).toBe(`<ol id='1' data-foo='bar'></ol>`)
  })  

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new OrderedList({ id: "1", data: { foo: "bar" } }).renderWrapper).toBe(`<ol id='1' data-foo='bar'></ol>`)
    expect(new OrderedList({ id: "1", data: { foo: "bar", baz: "qux" } }).renderWrapper).toBe(`<ol id='1' data-foo='bar' data-baz='qux'></ol>`)
    expect(new OrderedList({ id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).renderWrapper).toBe(`<ol id='1' data-foo-baz='qux' data-foo-quux='corge'></ol>`)
  })

  it("adds children", () => {
    const listItem = new ListItem()
    listItem.add(new Text("Hello, world!"))
    expect(new OrderedList().add(listItem).renderWrapper).toBe(`<ol ><li >Hello, world!</li></ol>`)
  })
})
