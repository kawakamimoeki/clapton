require "test_helper"
require "clapton/test_helper/minitest"

class SampleComponentTest < ActiveSupport::TestCase
  include Clapton::TestHelper::Minitest

  test "renders" do
    render_component(:SampleComponent, { message: "Hello World", boolean: true, datetime: Time.current })
    assert_selector "blockquote"
    assert_selector "div"
    assert_selector "button"
    assert_selector "input[type='checkbox']"
    assert_selector "code"
    assert_selector "input[type='datetime-local']"
    assert_selector "p"
    assert_selector "em"
    assert_selector "form"
    assert_selector "h1"
    assert_selector "img"
    assert_selector "li"
    assert_selector "ol"
    assert_selector "p"
    assert_selector "textarea"
    assert_text "Hello World"
  end
end
