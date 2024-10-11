import { describe, it, expect } from 'vitest'
import { splitActionAttribute } from './split-action-attribute'

describe('splitActionAttribute', () => {
  it("returns empty object if no action", () => {
    expect(splitActionAttribute("")).toEqual({
      eventType: "",
      componentName: "",
      stateName: "",
      fnName: "",
      bounceTime: 0
    })
  })

  it("returns eventType, componentName, stateName, fnName, bounceTime", () => {
    expect(splitActionAttribute("click->ChatState#send_message@10")).toEqual({ eventType: "click", componentName: "ChatComponent", stateName: "ChatState", fnName: "send_message", bounceTime: 10 })
  })
})
