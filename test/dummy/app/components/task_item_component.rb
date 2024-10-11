class TaskItemComponent < Clapton::Component
  def render
    button = Clapton::Button.new
    button.add(Clapton::Text.new(@state.done ? "✅" : "🟩"))
    button.add_action(:click, :TaskListState, :toggle_done)

    text_field = Clapton::TextField.new(@state, :title, { "id": "task-title-#{@state.id}" })
    text_field.add_action(:input, :TaskListState, :update_title)

    datetime_field = Clapton::DateTimeField.new(@state, :due, { "id": "task-due-#{@state.id}" })
    datetime_field.add_action(:input, :TaskListState, :update_due)

    @root.add(button).add(text_field).add(datetime_field)
    @root.render
  end
end
