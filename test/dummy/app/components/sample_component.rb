class SampleComponent < Clapton::Component
  def render
    embed = Clapton::Embed.new("<blockquote>This is a test</blockquote>")
    @root.add(embed)
    @root.render
  end
end
