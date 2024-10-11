import { describe, it, expect } from "vitest"
import { Component } from "./component"
import { Text } from "./text"

class TestComponent extends Component {
  get render() {
    this._root.add(new Text("Hello, world!"))
    return this._root.render
  }
}

describe("Component", () => {
  it("returns empty string if no params", () => {
    expect(new TestComponent().render).toMatch(/<div data-component='TestComponent' data-state='{}' data-id='.{8}'>Hello, world!<\/div>/)
  })
})
