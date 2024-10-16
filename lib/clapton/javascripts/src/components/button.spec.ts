import { describe, it, expect } from "vitest"
import { Button } from "./button"

describe("Button", () => {
  it("returns empty string if no params", () => {
    expect(new Button().renderWrapper).toBe("<button ></button>")
  })

  it("returns attributes and data attributes", () => {
    expect(new Button({ id: "1", "data-foo": "bar" }).renderWrapper).toBe(`<button id='1' data-foo='bar'></button>`)
  })

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new Button({ id: "1", data: { foo: "bar" } }).renderWrapper).toBe(`<button id='1' data-foo='bar'></button>`)
    expect(new Button({ id: "1", data: { foo: "bar", baz: "qux" } }).renderWrapper).toBe(`<button id='1' data-foo='bar' data-baz='qux'></button>`)
    expect(new Button({ id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).renderWrapper).toBe(`<button id='1' data-foo-baz='qux' data-foo-quux='corge'></button>`)
  })
})
