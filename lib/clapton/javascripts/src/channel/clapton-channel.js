import morphdom from "morphdom"
import { createConsumer } from "@rails/actioncable"
import { initializeActions } from "../actions/initialize-actions.ts"
import { initializeInputs } from "../inputs/initialize-inputs.ts"
const consumer = createConsumer()

export const claptonChannel = consumer.subscriptions.create("Clapton::ClaptonChannel", {
  connected() {
    window.actionCableConnected = true;
  },

  disconnected() {},

  async received(response) {
    const { data, errors } = response;
    const component = document.querySelector(`[data-id="${data.component.id}"]`)
    const module = await import(`${data.component.name}`);
    const instance = new module[data.component.name](data.state, data.component.id, errors);
    morphdom(component, instance.renderWrapper, {
      onBeforeElUpdated: (_fromEl, toEl) => {
        toEl.setAttribute("data-set-event-handler", "true");
        return true;
      }
    });

    initializeInputs();
    initializeActions();
    instance.runEffects();
  }
})
