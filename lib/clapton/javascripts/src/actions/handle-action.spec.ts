import { handleAction } from "./handle-action";
import { describe, it, expect, vi } from "vitest";
import { claptonChannel } from "../channel/clapton-channel"

describe("handleAction", () => {
  it("runs the action and calls claptonChannel.perform", async () => {
    const componentWrapper = document.createElement("div");
    componentWrapper.innerHTML = `<div data-component="TestComponent" data-state='{"testAttribute": "initial"}' data-id="1"></div>`;

    const input = document.createElement("input");
    input.setAttribute("data-attribute", "testAttribute");
    input.value = "updated";

    const component = componentWrapper.firstChild as HTMLElement;
    component.appendChild(input);

    document.body.appendChild(component);

    const performSpy = vi.spyOn(claptonChannel, "perform");

    await handleAction(input, "TestState", "testFunction");

    expect(component.getAttribute("data-state")).toBe('{"testAttribute":"updated"}');
    expect(performSpy).toHaveBeenCalledWith("action", {
      action: "action",
      data: {
        state: {
          name: "TestState",
          action: "testFunction",
          attributes: {
            testAttribute: "updated"
          }
        },
        component: {
          name: "TestComponent",
          id: "1",
        },
        params: {
          testAttribute: "updated"
        }
      }
    });

    performSpy.mockRestore();
  });
});
