import { describe, it, expect } from "vitest"
import { Form } from "./form"
import { Text } from "./text"

describe("Form", () => {
  it("returns empty string if no params", () => {
    expect(new Form().render).toBe("<form ></form>")
  })

  it("returns attributes and data attributes", () => {
    expect(new Form({ id: "1", "data-foo": "bar" }).render).toBe(`<form id='1' data-foo='bar'></form>`)
  })

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new Form({ id: "1", data: { foo: "bar" } }).render).toBe(`<form id='1' data-foo='bar'></form>`)
    expect(new Form({ id: "1", data: { foo: "bar", baz: "qux" } }).render).toBe(`<form id='1' data-foo='bar' data-baz='qux'></form>`)
    expect(new Form({ id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).render).toBe(`<form id='1' data-foo-baz='qux' data-foo-quux='corge'></form>`)
  })

  it("adds children", () => {
    const text = new Text("Hello")
    const form = new Form()
    form.add(text)
    expect(form.render).toBe(`<form >Hello</form>`)
  })
})
