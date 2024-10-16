import { describe, it, expect } from "vitest"
import { Text } from "./text"
import { Bold } from "./bold"

describe("Bold", () => {
  it("returns empty string if no params", () => {
    expect(new Bold().renderWrapper).toBe("<strong ></strong>")
  })

  it("returns attributes and data attributes", () => {
    expect(new Bold({ id: "1", "data-foo": "bar" }).renderWrapper).toBe(`<strong id='1' data-foo='bar'></strong>`)
  })


  it("adds children", () => {
    const text = new Text("Hello")
    const bold = new Bold()
    bold.add(text)
    expect(bold.renderWrapper).toBe(`<strong >Hello</strong>`)
  })
})
