class UserItemComponent < Clapton::Component
  def render
    box = c(:box)
    link = c(:link, { href: "/users/#{state[:id]}" })
    link.add(c(:text, state[:name]))
    form = UserFormComponent.new({ id: state[:id], name: state[:name], count: state[:count] })
    text = c(:text, state[:count].to_s)
    box.add(link).add(form).add(text)
  end
end
