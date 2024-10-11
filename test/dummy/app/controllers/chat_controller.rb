class ChatController < ApplicationController
  def index
    @components = [
      [:ChatComponent, { messages: [{ role: "assistant", content: "Hello" }] }],
      [:ChatComponent, { messages: [{ role: "assistant", content: "Hello" }] }],
    ]
  end
end
