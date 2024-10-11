import { describe, it, expect } from "vitest"
import { Link } from "./link"
import { Text } from "./text"

describe("Link", () => {
  it("returns empty string if no params", () => {
    expect(new Link("").render).toBe("<a href='' ></a>")
  })

  it("returns attributes and data attributes", () => {
    expect(new Link("#").add(new Text("")).render).toBe(`<a href='#' ></a>`)
  })

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new Link("#", { id: "1", data: { foo: "bar" } }).render).toBe(`<a href='#' id='1' data-foo='bar'></a>`)
    expect(new Link("#", { id: "1", data: { foo: "bar", baz: "qux" } }).render).toBe(`<a href='#' id='1' data-foo='bar' data-baz='qux'></a>`)
    expect(new Link("#", { id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).render).toBe(`<a href='#' id='1' data-foo-baz='qux' data-foo-quux='corge'></a>`)
  })

  it("adds children", () => {
    expect(new Link("#").add(new Text("Hello")).render).toBe(`<a href='#' >Hello</a>`)
  })
})
