import { describe, it, expect } from "vitest"
import { Input } from "./input"

describe("Input", () => {
  it("returns empty string if no params", () => {
    expect(new Input({}, "foo", { type: "text" }).renderWrapper).toMatch(/<input type='text' data-attribute='foo' data-id='.+' value=''\/>/)
  })

  it("returns attributes and data attributes", () => {
    expect(new Input({ foo: "bar" }, "foo", { type: "text", id: "1", "data-foo": "bar" }).renderWrapper).toMatch(/<input type='text' id='1' data-foo='bar' data-attribute='foo' data-id='.+' value='bar'\/>/)
  })

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new Input({ foo: "bar" }, "foo", { type: "text", id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).renderWrapper).toMatch(/<input type='text' id='1' data-attribute='foo' data-id='.+' data-foo-baz='qux' data-foo-quux='corge' value='bar'\/>/)
  })
})
