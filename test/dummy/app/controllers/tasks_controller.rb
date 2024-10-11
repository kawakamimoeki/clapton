class TasksController < ApplicationController
  def index
    @tasks = Task.all
    @components = [
      [:TaskListComponent, { tasks: @tasks.map { |task| { id: task.id, title: task.title, due: task.due, done: task.done } } }]
    ]
  end
end
