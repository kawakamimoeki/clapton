class UserListComponent < Clapton::Component
  def render
    state[:users].each do |user|
      @root.add(UserItemComponent.new(id: user[:id], name: user[:name], count: user[:count]))
    end
    @root.render
  end
end
