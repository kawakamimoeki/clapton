class MessageComponent < Clapton::Component
  def render
    @root.add(Clapton::Text.new("#{@state[:role]}: #{@state[:content]}"))
    @root.render
  end
end
