class ChatComponent < Clapton::Component
  def render
    box = c(:box)
    @state[:messages].each do |message|
      box.add(MessageComponent.new(role: message[:role], content: message[:content]))
    end
    box.add(UserPromptComponent.new(role: "user", content: ""))
  end
end
