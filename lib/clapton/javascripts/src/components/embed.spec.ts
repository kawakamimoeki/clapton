import { describe, it, expect } from "vitest"
import { Embed } from "./embed"

describe("Embed", () => {
  it("returns empty string if no params", () => {
    expect(new Embed("<blockquote></blockquote>").render).toBe("<blockquote></blockquote>")
  })
})
