class TaskListState < Clapton::State
  attribute :tasks

  def add_task(params)
    task = Task.create(title: "New Task", due: Date.today, done: false)
    self.tasks << { id: task.id, title: task.title, due: task.due, done: task.done }
  end

  def toggle_done(params)
    task = Task.find(params[:id])
    task.update(done: !params[:done])
    self.tasks.find { |t| t[:id] == params[:id] }[:done] = task.done
  end

  def update_title(params)
    task = Task.find_or_create_by(id: params[:id])
    if params[:id].nil?
      self.tasks.find { |t| !t[:id] }[:id] = task.id
    end
    task.update(title: params[:title])
    self.tasks.find { |t| t[:id] == task.id }[:title] = task.title
  end

  def update_due(params)
    task = Task.find(params[:id])
    task.update(due: params[:due])
    self.tasks.find { |t| t[:id] == params[:id] }[:due] = task.due
  end

  def add_empty_task(params)
    self.tasks << { id: nil, title: "", due: "", done: false }
  end
end

