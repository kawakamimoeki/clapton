import { initializeActions } from "actions/initialize-actions";
import { initializeInputs } from "inputs/initialize-inputs";

interface ComponentDefinition {
  component: string;
  state: any;
  id: string;
}

const initializeComponents = async () => {
  const components = document.querySelector("#clapton")?.getAttribute("data-clapton") || "[]";
  const componentArray = JSON.parse(components);
  for (const component of componentArray) {
    await createAndAppendComponent(component, document.querySelector("#clapton")!);
  }
  const elements = document.querySelectorAll(".clapton-component");
  for (const element of elements) {
    const component = JSON.parse(element.getAttribute("data-clapton") || "{}");
    await createAndAppendComponent(component, element as HTMLElement);
  }
};

const createAndAppendComponent = async (component: ComponentDefinition, element: HTMLElement) => {
  if (!element) {
    return;
  }
  const componentDom = document.createElement('div');
  const module = await import(`${component.component}`);
  const instance = new (module[component.component] as any)(component.state);
  componentDom.innerHTML = instance.renderWrapper;
  const firstChild = componentDom.firstChild as HTMLElement;
  if (firstChild) {
    if (element.children.length > 0) {
      element.appendChild(firstChild);
    } else {
      element.outerHTML = firstChild.outerHTML;
    }
  }
  instance.runEffects();
};

document.addEventListener("DOMContentLoaded", async () => {
  await initializeComponents();
  initializeActions();
  initializeInputs();
  const event = new Event('clapton:render');
  document.dispatchEvent(event);
});

document.addEventListener("turbo:render", async () => {
  await initializeComponents();
  initializeActions();
  initializeInputs();
  const event = new Event('clapton:render');
  document.dispatchEvent(event);
});

window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('scrollPosition', window.scrollY.toString());
});

document.addEventListener("clapton:render", () => {
  const scrollPosition = sessionStorage.getItem('scrollPosition');
  if (scrollPosition) {
    window.scrollTo(0, parseInt(scrollPosition));
  }
});
