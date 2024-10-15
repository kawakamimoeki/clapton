import morphdom from "morphdom";

export const updateComponent = async (component: HTMLElement, state: any, property: string, target: HTMLInputElement) => {
  state[property] = target.value;
  const componentName = component.dataset.component as string;
  const module = await import(`${componentName}`);
  const ComponentClass = module[componentName] as any;
  const instance = new ComponentClass(state, component.dataset.id);
  morphdom(component, instance.render);
};
