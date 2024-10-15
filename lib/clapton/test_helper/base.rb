module Clapton
  module TestHelper
    module Base
      require "execjs"

      def render_component(component, **kwargs)
        js = File.read(File.join(__dir__, "..", "javascripts", "dist", "components-for-test.js"))
        Dir.glob(Rails.root.join("app", "components", "**", "*.rb")).each do |file|
          js += Ruby2JS.convert(File.read(file), preset: true)
          js += "\n"
        end
        context = ExecJS.compile(js)
        html = context.eval("new #{component.name.camelize}(#{kwargs.to_json}).render")
        @page = Capybara.string(html)
      end

      def page
        @page
      end
    end
  end
end
