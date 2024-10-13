require "test_helper"
require "clapton/test_helper/minitest"

class TaskListComponentTest < ActiveSupport::TestCase
  include Clapton::TestHelper::Minitest

  test "renders" do
    render_component(:TaskListComponent, tasks: [{ id: 1, title: "Task 1", done: false, due: Time.current }])
    assert_selector "input[type='text']"
  end
end
