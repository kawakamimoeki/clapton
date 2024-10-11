import { describe, it, expect } from "vitest"
import { Code } from "./code"
import { Text } from "./text"

describe("Code", () => {
  it("returns empty string if no params", () => {
    expect(new Code().render).toBe("<code ></code>")
  })

  it("returns attributes and data attributes", () => {
    expect(new Code({ id: "1", "data-foo": "bar" }).render).toBe(`<code id='1' data-foo='bar'></code>`)
  })

  it("returns attributes and data attributes with custom data attributes", () => {
    expect(new Code({ id: "1", data: { foo: "bar" } }).render).toBe(`<code id='1' data-foo='bar'></code>`)
    expect(new Code({ id: "1", data: { foo: "bar", baz: "qux" } }).render).toBe(`<code id='1' data-foo='bar' data-baz='qux'></code>`)
    expect(new Code({ id: "1", data: { foo: { baz: "qux", quux: "corge" } } }).render).toBe(`<code id='1' data-foo-baz='qux' data-foo-quux='corge'></code>`)
  })

  it("adds children", () => {
    const text = new Text("Hello")
    const code = new Code()
    code.add(text)
    expect(code.render).toBe(`<code >Hello</code>`)
  })
})
