import { describe, it, expect } from "vitest"
import { Input } from "./input"

describe("Input", () => {
  it("returns empty string if no params", () => {
    expect(new Input({}, "foo", { type: "text" }).renderWrapper).toBe("<input type='text' data-attribute='foo' value=''/>")
  })

  it("returns attributes and data attributes", () => {
    expect(new Input({ foo: "bar" }, "foo", { type: "text", id: "1", "data-foo": "bar" }).renderWrapper).toBe(`<input type='text' id='1' data-foo='bar' data-attribute='foo' value='bar'/>`)
  })

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new Input({ foo: "bar" }, "foo", { type: "text", id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).renderWrapper).toBe(`<input type='text' id='1' data-attribute='foo' data-foo-baz='qux' data-foo-quux='corge' value='bar'/>`)
  })
})
