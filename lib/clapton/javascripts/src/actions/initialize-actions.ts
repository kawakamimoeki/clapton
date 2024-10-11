import { splitActionAttribute } from "../html/split-action-attribute";
import { handleAction } from "./handle-action";
import { debounce } from "../utils/debounce";

export const initializeActions = () => {
  const actionElements = document.querySelectorAll("[data-action]");
  actionElements.forEach((element) => initializeActionsForElement(element as HTMLElement));
};

const initializeActionsForElement = (element: HTMLElement) => {
  if (element.getAttribute("data-set-event-handler")) return;
  const actions = element.getAttribute("data-action")?.split(" ") || [];
  actions.forEach(action => {
    const { eventType, componentName, stateName, fnName, bounceTime } = splitActionAttribute(action);
    if (!eventType || !componentName || !fnName) return;

    if (bounceTime > 0) {
      element.addEventListener(eventType, debounce((event) => 
        handleAction(event.target as HTMLElement, stateName, fnName), bounceTime)
      );
    } else {
      element.addEventListener(eventType, (event) => 
        handleAction(event.target as HTMLElement, stateName, fnName)
      );
    }
    element.setAttribute("data-set-event-handler", "true");
  });
};
