module Clapton
  module ClaptonHelper

    def clapton_javascript_tag
      all_components = Dir.glob(Rails.root.join("app", "components", "**", "*.rb"))
      tags = <<~HTML
        <script type="importmap">
          {
            "imports": {
              "client": "/clapton/client.js",
              "components": "/clapton/components.js",
              #{ all_components.map do
               |component| "\"#{File.basename(component, ".rb").camelize}\": \"/clapton/#{File.basename(component, ".rb").camelize}.js\""
              end.join(",\n") }
            }
          }
        </script>
        <script type="module" src="/clapton/client.js"></script>
      HTML
      tags.html_safe
    end

    def clapton_tag
      datas = []
      @components.each do |component|
        state_class = component[0].to_s.gsub("Component", "State")
        if Object.const_defined?(state_class)
          datas << { component: component[0].to_s, state: Object.const_get(state_class).new(component[1]).to_h }
        else
          datas << { component: component[0].to_s, state: {} }
        end
      end
      tag.div(id: "clapton", data: { clapton: datas })
    end

    def clapton_component_tag(component, params)
      state_class = component.to_s.gsub("Component", "State")
      if Object.const_defined?(state_class)
        data = { component: component.to_s, state: Object.const_get(state_class).new(params).to_h }
      else
        data = { component: component.to_s, state: {} }
      end
      tag.div(class: "clapton-component", data: { clapton: data })
    end
  end
end
