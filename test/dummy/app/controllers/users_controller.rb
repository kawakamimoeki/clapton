class UsersController < ApplicationController
  def index
    @components = [
      [:UserListComponent, { users: User.all.map { |user| { id: user.id, name: user.name, count: user.name.length } } }]
    ]
  end
end
