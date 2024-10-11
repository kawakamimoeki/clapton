class TaskListComponent < Clapton::Component
  def render
    @state.tasks.each do |task|
      @root.add(TaskItemComponent.new(id: task[:id], title: task[:title], due: task[:due], done: task[:done]))
    end
    add_button = Clapton::Button.new
    add_button.add(Clapton::Text.new("Add Task"))
    add_button.add_action(:click, :TaskListState, :add_task)
    @root.add(add_button)
    @root.render
  end
end
