class UserItemState < Clapton::State
  attribute :id
  attribute :name
  attribute :count

  def update(params)
    self.name = params[:name]
    self.count = params[:name].length
  end
end
