module Clapton
  module TestHelper
    module Base
      require "execjs"

      def render_component(component, params)
        js = File.read(File.join(__dir__, "..", "javascripts", "dist", "components-for-test.js"))
        js += File.read(File.join(__dir__, "..", "javascripts", "dist", "c-for-test.js"))
        Dir.glob(Rails.root.join("app", "components", "**", "*.rb")).each do |file|
          code = File.read(file)
          js += Ruby2JS.convert(code, preset: true)
          js += "\n"
        end
        js = js.sub("const Clapton = {
        Box, Component, Text, TextField, Button, DateTimeField, BlockQuote, Checkbox, Code, Element, Emphasis, Form, Heading, Image, Link, List, ListItem, OrderedList, Paragraph, Quote, RadioButton, Select, Span, Embed, Bold, TextArea
    };", "const Clapton = {
        Box, Text, TextField, Button, DateTimeField, BlockQuote, Checkbox, Code, Element, Emphasis, Form, Heading, Image, Link, List, ListItem, OrderedList, Paragraph, Quote, RadioButton, Select, Span, Embed, Bold, TextArea
    };")
        context = ExecJS.compile(js)
        html = context.eval("new #{component.name.camelize}(#{params.to_json}).renderWrapper")
        @page = Capybara.string(html)
      end

      def page
        @page
      end
    end
  end
end
