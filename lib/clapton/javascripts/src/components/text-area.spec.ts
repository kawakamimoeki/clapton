import { describe, it, expect } from "vitest"
import { TextArea } from "./text-area"

describe("TextArea", () => {
  it("returns empty string if no params", () => {
    expect(new TextArea({}, "foo").render).toBe("<textarea data-attribute='foo'></textarea>")
  })

  it("returns attributes and data attributes", () => {
    expect(new TextArea({ foo: "bar" }, "foo", { id: "1", "data-foo": "bar" }).render).toBe(`<textarea id='1' data-foo='bar' data-attribute='foo'>bar</textarea>`)
  })

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new TextArea({ foo: "bar" }, "foo", { id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).render).toBe(`<textarea id='1' data-attribute='foo' data-foo-baz='qux' data-foo-quux='corge'>bar</textarea>`)
  })
})
