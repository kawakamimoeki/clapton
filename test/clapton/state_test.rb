require "test_helper"

class TestState < Clapton::State
  attribute :foo
  attribute :bar
  attribute :items
end

class StateSpec < ActiveSupport::TestCase
  test "can define state" do
    state = TestState.new
    assert_equal({}, state.attributes)
  end

  test "can set and get multiple states" do
    state = TestState.new
    state.foo = "bar"
    state.bar = "baz"
    assert_equal("bar", state.foo)
    assert_equal("baz", state.bar)
  end

  test "can set attributes with a hash" do
    state = TestState.new(foo: "bar", bar: "baz")
    assert_equal({ foo: "bar", bar: "baz" }, state.to_h)
  end

  test "can set array attributes" do
    state = TestState.new(items: ["foo", "bar"])
    state.items << "baz"
    assert_equal(["foo", "bar", "baz"], state.items)
  end
end
