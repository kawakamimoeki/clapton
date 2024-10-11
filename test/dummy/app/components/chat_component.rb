class ChatComponent < Clapton::Component
  def render
    @state[:messages].each do |message|
      @root.add(MessageComponent.new(role: message[:role], content: message[:content]))
    end
    @root.add(UserPromptComponent.new(role: "user", content: ""))
    @root.render
  end
end
