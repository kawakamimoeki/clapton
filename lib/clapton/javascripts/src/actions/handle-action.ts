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
  const attribute = target.getAttribute("data-attribute");
  if (attribute) {  
    const state = JSON.parse(component.getAttribute("data-state") || "{}");
    if (target.tagName === "INPUT") {
      state[attribute] = (target as HTMLInputElement).value;
      component.setAttribute("data-state", JSON.stringify(state));
    }
  };
  claptonChannel.perform(
    "action",
    {
      data: {
        component: {
          name: stateName.replace("State", "Component"),
          id: targetComponent.getAttribute("data-id"),
        },
        state: {
          name: stateName,
          action: fn,
          attributes: JSON.parse(targetComponent.getAttribute("data-state") || "{}"),
        },
        params: JSON.parse(component.getAttribute("data-state") || "{}")
      }
    }
  );
};
