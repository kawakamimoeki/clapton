require "rails/generators"

module Rails
  module Generators
    class ClaptonGenerator < Rails::Generators::NamedBase
      def create_component_file
        create_file "app/components/#{file_name}_component.rb" do
          <<~RUBY
          class #{class_name}Component < Clapton::Component
          end
          RUBY
        end

        create_file "app/states/#{file_name}_state.rb" do
          <<~RUBY
          class #{class_name}State < Clapton::State
          end
          RUBY
        end
      end 
    end
  end
end
