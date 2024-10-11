import { describe, it, expect } from "vitest"
import { RadioButton } from "./radio-button"

describe("RadioButton", () => {
  it("returns empty string if no params", () => {
    expect(new RadioButton({}, "foo").render).toBe("<input type='radio' data-attribute='foo' value=''/>")
  })

  it("returns attributes and data attributes", () => {
    expect(new RadioButton({ foo: "bar" }, "foo", { id: "1", "data-foo": "bar" }).render).toBe(`<input type='radio' id='1' data-foo='bar' data-attribute='foo' value='bar'/>`)
  })

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new RadioButton({ foo: "bar" }, "foo", { id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).render).toBe(`<input type='radio' id='1' data-attribute='foo' data-foo-baz='qux' data-foo-quux='corge' value='bar'/>`)
  })
})
