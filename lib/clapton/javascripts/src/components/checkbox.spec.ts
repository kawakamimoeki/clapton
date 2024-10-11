import { describe, it, expect } from "vitest"
import { Checkbox } from "./checkbox"

describe("Checkbox", () => {
  it("returns empty string if no params", () => {
    expect(new Checkbox({}, "foo").render).toBe("<input type='checkbox' data-attribute='foo' value=''/>")
  })

  it("returns attributes and data attributes", () => {
    expect(new Checkbox({ foo: "bar" }, "foo", { id: "1", "data-foo": "bar" }).render).toBe(`<input type='checkbox' id='1' data-foo='bar' data-attribute='foo' value='bar'/>`)
  })

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new Checkbox({ foo: "bar" }, "foo", { id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).render).toBe(`<input type='checkbox' id='1' data-attribute='foo' data-foo-baz='qux' data-foo-quux='corge' value='bar'/>`)
  })
})
