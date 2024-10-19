class HomeComponent < Clapton::Component
  def render
    box = c(:div)
    box.add(c(:text, @state.message))
    box
  end
end
