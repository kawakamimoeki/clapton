import { describe, it, expect } from "vitest"
import { Text } from "./text"

describe("Text", () => {
  it("returns empty string if no params", () => {
    expect(new Text("").render).toBe("")
  })

  it("returns value", () => {
    expect(new Text("bar").render).toBe("bar")
  })
})
