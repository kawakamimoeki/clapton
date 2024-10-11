require "test_helper"

class TaskListComponentTest < ActiveSupport::TestCase
  include Clapton::TestHelper::Minitest
  
  test "renders" do
    render_component(:TaskListComponent, tasks: [{ id: 1, title: "Task 1", done: false, due: Time.current }])
    assert_selector "input[type='text']"
  end
end
