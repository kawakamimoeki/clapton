require "rails_helper"

describe "Tasks", :js do
  it "displays a task" do
    Task.create!(title: "Task 1", done: false, due: Time.current)
    visit tasks_path
    expect(page).to have_content("🟩")
    expect(page).to have_selector("input[type='text'][value='Task 1']")
    expect(page).to have_content("Add Task")
  end

  it "creates a task" do
    visit tasks_path
    click_on "Add Task"
    expect(page).to have_selector("input[type='text'][value='New Task']")
  end

  it "updates a task done status" do
    Task.create!(title: "Task 1", done: false, due: Time.current)
    visit tasks_path
    click_on "🟩", match: :first
    sleep 1
    expect(page).to have_content("✅")
  end

  it "updates a task title" do
    Task.create!(title: "Task 1", done: false, due: Time.current)
    visit tasks_path
    field = find("input[type='text'][value='Task 1']")
    8.times { field.send_keys(:backspace) }
    field.send_keys("T")
    sleep 0.1
    field.send_keys("a")
    sleep 0.1
    field.send_keys("s")
    sleep 0.1
    field.send_keys("k")
    sleep 0.1
    field.send_keys(:space)
    sleep 0.1
    field.send_keys("2")
    sleep 1
    expect(page).to have_selector("input[type='text'][value='Task 2']")
  end

  it "updates a task due date" do
    Task.create!(title: "Task 1", done: false, due: Time.current)
    visit tasks_path
    find("input[type='datetime-local'][id='task-due-#{Task.last.id}']").fill_in with: "2024-10-14T10:00"
  end
end
