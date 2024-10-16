import { describe, it, expect } from "vitest"
import { Text } from "./text"

describe("Text", () => {
  it("returns empty string if no params", () => {
    expect(new Text("").renderWrapper).toBe("")
  })

  it("returns value", () => {
    expect(new Text("bar").renderWrapper).toBe("bar")
  })
})
