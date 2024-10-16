class HomeComponent < Clapton::Component
  def render
    box = c(:box)
    box.add(c(:text, @state.message))
    box
  end
end
