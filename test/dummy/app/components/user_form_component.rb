class UserFormComponent < Clapton::Component
  def render
    text_field = Clapton::Input.new(@state, :name, { type: "text" })
    text_field.add_action(:input, :UserFormState, :save, { debounce: 500 })
    text_field.add_action(:input, :UserItemState, :update, { debounce: 500 })
  end
end
