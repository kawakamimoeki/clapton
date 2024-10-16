class TaskItemComponent < Clapton::Component
  def render
    box = c.box
    btn = c.button({ "data-testid": "task-done-#{@state.id}" })
    btn.add(c.text(@state.done ? "✅" : "🟩"))
    btn.add_action(:click, :TaskListState, :toggle_done)

    tf = c.input(@state, :title, { "data-testid": "task-title-#{@state.id}" })
    tf.add_action(:input, :TaskListState, :update_title)

    dt = c.datetime(@state, :due, { "data-testid": "task-due-#{@state.id}" })
    dt.add_action(:input, :TaskListState, :update_due)

    box.add(btn).add(tf).add(dt)
    box
  end
end
