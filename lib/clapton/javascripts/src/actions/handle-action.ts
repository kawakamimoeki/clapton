import { claptonChannel } from "../channel/clapton-channel";

export const handleAction = async (target: HTMLElement, stateName: string, fn: string) => {
  let targetComponent = target;
  if (target.dataset.component === stateName.replace("State", "Component")) {
    targetComponent = target
  } else {
    targetComponent = target.closest(`[data-component="${stateName.replace("State", "Component")}"]`) as HTMLElement;
  }
  if (!targetComponent) return;
  const component = target.closest(`[data-component]`) as HTMLElement;
  const attribute = target.dataset.attribute;
  if (attribute) {  
    const state = JSON.parse(component.dataset.state || "{}");
    if (target.tagName === "INPUT") {
      state[attribute] = (target as HTMLInputElement).value;
      component.dataset.state = JSON.stringify(state);
    }
  };
  claptonChannel.perform(
    "action",
    {
      data: {
        component: {
          name: stateName.replace("State", "Component"),
          id: targetComponent.dataset.id,
        },
        state: {
          name: stateName,
          action: fn,
          attributes: JSON.parse(targetComponent.dataset.state || "{}"),
        },
        params: JSON.parse(component.dataset.state || "{}")
      }
    }
  );
};
