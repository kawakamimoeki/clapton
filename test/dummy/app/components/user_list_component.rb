class UserListComponent < Clapton::Component
  def render
    box = c.box
    state[:users].each do |user|
      box.add(UserItemComponent.new(id: user[:id], name: user[:name], count: user[:count]))
    end
    box
  end
end
