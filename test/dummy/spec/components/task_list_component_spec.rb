require "rails_helper"

RSpec.describe :TaskListComponent, type: :component do
  it "renders the component" do
    rendered = render_component(:TaskListComponent, tasks: [{ id: 1, title: "Task 1", done: false, due: Time.current }])
    expect(rendered).to have_selector("input[type='text']")
  end
end
