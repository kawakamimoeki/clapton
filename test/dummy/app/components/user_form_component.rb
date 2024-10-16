class UserFormComponent < Clapton::Component
  def render
    text_field = Clapton::TextField.new(state, :name)
    text_field.add_action(:input, :UserFormState, :save, { debounce: 500 })
    text_field.add_action(:input, :UserItemState, :update, { debounce: 500 })
  end
end
