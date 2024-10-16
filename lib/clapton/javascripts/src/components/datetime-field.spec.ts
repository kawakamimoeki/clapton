import { describe, it, expect } from "vitest"
import { DateTimeField } from "./datetime-field"

describe("DateTimeField", () => {
  it("returns empty string if no params", () => {
    expect(new DateTimeField({}, "foo").renderWrapper).toBe("<input type='datetime-local' data-attribute='foo' value=''/>")
  })

  it("returns attributes and data attributes", () => {
    expect(new DateTimeField({ foo: new Date("2024-10-12T12:00") }, "foo", { id: "1", "data-foo": "bar" }).renderWrapper).toMatch(/<input type='datetime-local' id='1' data-foo='bar' data-attribute='foo' value='.+'\/>/)
  })

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new DateTimeField({ foo: new Date("2024-10-12T12:00") }, "foo", { id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).renderWrapper).toMatch(/<input type='datetime-local' id='1' data-attribute='foo' data-foo-baz='qux' data-foo-quux='corge' value='.+'\/>/)
  })
})
