require "clapton/test_helper/base"

module Clapton
  module TestHelper
    module RSpec
      require "capybara/rspec"

      include Clapton::TestHelper::Base
      include Capybara::RSpecMatchers
    end
  end
end
