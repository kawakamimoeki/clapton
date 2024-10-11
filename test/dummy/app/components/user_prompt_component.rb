class UserPromptComponent < Clapton::Component
  def render
    text_field = Clapton::TextField.new(@state, :content)
    button = Clapton::Button.new({ disabled: @state.content.empty? })
    button.add(Clapton::Text.new("Send"))
    button.add_action(:click, :ChatState, :send)
    @root.add(text_field).add(button)
    @root.render
  end
end
