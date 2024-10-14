import { updateComponent } from "../dom/update-component";

export const initializeInputs = () => {
  const inputElements = document.querySelectorAll("[data-attribute]");
  inputElements.forEach((element: any) => {
    const attribute = element.getAttribute("data-attribute");
    const component = element.closest(`[data-component]`) as HTMLElement;
    const state = JSON.parse(component.getAttribute("data-state") || "{}");
    if (!attribute || !component) return;
    if (element.tagName === "INPUT") {
      element.addEventListener("input", (event: Event) => {
        updateComponent(component, state, attribute, event.target as HTMLInputElement);
      });
    }
  });
};
