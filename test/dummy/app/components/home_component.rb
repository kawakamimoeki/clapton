class HomeComponent < Clapton::Component
  def render
    @root.add(Clapton::Text.new(@state.message))
    @root.render
  end
end
