import { updateComponent } from "./update-component";
import { describe, it, expect } from "vitest";

describe("updateComponent", () => {
  it("updates the component", () => {
    const component = document.createElement("div");
    component.innerHTML = `<div data-component="TestComponent" data-state='{"testAttribute": "initial"}'></div>`;

    const input = document.createElement("div");
    input.innerHTML = `<input value="updated" data-attribute="testAttribute">`;

    class TestComponent {
      state: any;
      constructor(state: any) {
        this.state = state;
      }
      get render() {
        return `<div>${this.state.testAttribute}</div>`;
      }
    };
    (window as any).TestComponent = TestComponent;

    updateComponent(
      component.firstChild as HTMLElement,
      JSON.parse(component.getAttribute("data-state") || "{}"),
      "testAttribute",
      input.firstChild as HTMLInputElement
    );

    expect(component.textContent).toBe("updated");
  });
});
