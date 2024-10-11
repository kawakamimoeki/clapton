module Clapton
  class State
    attr_reader :attributes
    attr_accessor :errors

    def initialize(params = {})
      @attributes = params
      @errors = []
    end

    def to_h
      @attributes
    end

    def self.attribute(attribute_name)
      define_method(attribute_name) do
        @attributes[attribute_name.to_sym]
      end

      define_method("#{attribute_name}=") do |value|
        @attributes[attribute_name.to_sym] = value
      end
    end
  end
end
