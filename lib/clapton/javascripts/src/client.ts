import { splitActionAttribute } from "./html/split-action-attribute"
import { updateComponent } from "./dom/update-component"
import { handleAction } from "./actions/handle-action"
import { initializeActions } from "actions/initialize-actions";
import { initializeInputs } from "inputs/initialize-inputs";

interface ComponentDefinition {
  component: new (state: any) => ComponentInstance;
  state: any;
  id: string;
}

interface ComponentInstance {
  render: string;
  [key: string]: any;
}

const initializeComponents = () => {
  const components = document.querySelector("#clapton")?.getAttribute("data-clapton") || "[]";
  JSON.parse(components).forEach((component: ComponentDefinition) => createAndAppendComponent(component, document.querySelector("#clapton")!));
  document.querySelectorAll(".clapton-component").forEach((element) => {
    const component = JSON.parse(element.getAttribute("data-clapton") || "{}");
    createAndAppendComponent(component, element as HTMLElement);
  });
};

const createAndAppendComponent = (component: ComponentDefinition, element: HTMLElement) => {
  const componentDom = document.createElement('div');
  const instance = new (window[component.component as any] as any)(component.state);
  componentDom.innerHTML = instance.render;
  const firstChild = componentDom.firstChild as HTMLElement;
  if (firstChild) {
    element.appendChild(firstChild);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initializeComponents();
  initializeActions();
  initializeInputs();
});
