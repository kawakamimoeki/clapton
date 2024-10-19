class MessageComponent < Clapton::Component
  def render
    box = c(:div)
    box.add(c(:text, "#{@state[:role]}: #{@state[:content]}"))
    box
  end
end
