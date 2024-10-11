require "clapton/test_helper/base"

module Clapton
  module TestHelper
    module Minitest
      require "capybara/minitest"

      include Clapton::TestHelper::Base
      include Capybara::Minitest::Assertions
    end
  end
end
