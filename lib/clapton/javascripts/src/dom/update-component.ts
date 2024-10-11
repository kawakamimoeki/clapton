import morphdom from "morphdom";

export const updateComponent = (component: HTMLElement, state: any, property: string, target: HTMLInputElement) => {
  state[property] = target.value;
  component.setAttribute("data-state", JSON.stringify(state));
  const componentName = component.getAttribute("data-component") as string;
  const ComponentClass = window[componentName as any] as any;
  const instance = new ComponentClass(state, component.dataset.id);
  morphdom(component, instance.render);
};
