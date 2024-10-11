class UserFormState < Clapton::State
  attribute :id
  attribute :name

  def save(params)
    u = User.find(params[:id])
    u.name = params[:name]
    u.save
  end
end
