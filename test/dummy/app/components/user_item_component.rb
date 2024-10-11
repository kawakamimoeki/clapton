class UserItemComponent < Clapton::Component
  def render
    link = Clapton::Link.new({ href: "/users/#{state[:id]}" })
    link.add(Clapton::Text.new(state[:name]))
    form = UserFormComponent.new({ id: state[:id], name: state[:name], count: state[:count] })
    text = Clapton::Text.new(state[:count].to_s)
    @root.add(link).add(form).add(text)
    @root.render
  end
end
