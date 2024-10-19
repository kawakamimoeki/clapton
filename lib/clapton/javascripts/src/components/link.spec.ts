import { describe, it, expect } from "vitest"
import { Link } from "./link"
import { Text } from "./text"

describe("Link", () => {
  it("returns empty string if no params", () => {
    expect(new Link({ href: "" }).renderWrapper).toBe("<a href=''></a>")
  })

  it("returns attributes and data attributes", () => {
    expect(new Link({ href: "#" }).add(new Text("")).renderWrapper).toBe(`<a href='#'></a>`)
  })

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new Link({ href: "#", id: "1", data: { foo: "bar" } }).renderWrapper).toBe(`<a href='#' id='1' data-foo='bar'></a>`)
    expect(new Link({ href: "#", id: "1", data: { foo: "bar", baz: "qux" } }).renderWrapper).toBe(`<a href='#' id='1' data-foo='bar' data-baz='qux'></a>`)
    expect(new Link({ href: "#", id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).renderWrapper).toBe(`<a href='#' id='1' data-foo-baz='qux' data-foo-quux='corge'></a>`)
  })

  it("adds children", () => {
    expect(new Link({ href: "#" }).add(new Text("Hello")).renderWrapper).toBe(`<a href='#'>Hello</a>`)
  })
})
