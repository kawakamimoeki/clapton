require "test_helper"
require "clapton/test_helper/minitest"

class SampleComponentTest < ActiveSupport::TestCase
  include Clapton::TestHelper::Minitest

  test "renders" do
    render_component(:SampleComponent)
    assert_selector "blockquote"
    assert_text "This is a test"
  end
end
