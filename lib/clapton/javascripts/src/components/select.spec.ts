import { describe, it, expect } from "vitest"
import { Select } from "./select"

describe("Select", () => {
  it("returns empty string if no params", () => {
    expect(new Select([], {}, "foo").render).toBe("<select ></select>")
  })

  it("returns attributes and data attributes", () => {
    expect(new Select([], {}, "foo", { id: "1", "data-foo": "bar" }).render).toBe(`<select id='1' data-foo='bar'></select>`)
  })

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new Select([], {}, "foo", { id: "1", data: { foo: "bar" } }).render).toBe(`<select id='1' data-foo='bar'></select>`)
    expect(new Select([], {}, "foo", { id: "1", data: { foo: "bar", baz: "qux" } }).render).toBe(`<select id='1' data-foo='bar' data-baz='qux'></select>`)
    expect(new Select([], {}, "foo", { id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).render).toBe(`<select id='1' data-foo-baz='qux' data-foo-quux='corge'></select>`)
  })

  it("returns options", () => {
    expect(new Select([{ value: "1", text: "One" }], { foo: "1" }, "foo").render).toBe(`<select ><option value='1' selected>One</option></select>`)
  })
})
