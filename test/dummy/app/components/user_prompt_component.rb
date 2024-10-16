class UserPromptComponent < Clapton::Component
  def render
    box = c(:box)
    text_field = c(:input, @state, :content)
    button = c(:button, { disabled: @state.content.empty? })
    button.add(c(:text, "Send"))
    button.add_action(:click, :ChatState, :send)
    box.add(text_field).add(button)
    box
  end
end
