module Clapton
  module ClaptonHelper

    def clapton_javascript_tag(entry_point = "application", importmap: nil)
      all_components = Dir.glob(Rails.root.join("app", "components", "**", "*.rb"))
      clapton_json = JSON.parse <<~JSON
      {
            "imports": {
              "client": "/clapton/client.js",
              "components": "/clapton/components.js",
              "c": "/clapton/c.js",
              #{ all_components.map do
               |component| "\"#{File.basename(component, ".rb").camelize}\": \"/clapton/#{File.basename(component, ".rb").camelize}.js\""
              end.join(",\n") }
            }
          }
      JSON
      if defined?(javascript_importmap_tags)
        importmap ||= Rails.application.importmap
        json = { imports: JSON.parse(importmap.to_json(resolver: self))["imports"].merge(clapton_json["imports"]) }
        safe_join [
          javascript_inline_importmap_tag(json.to_json),
          javascript_importmap_module_preload_tags(importmap, entry_point:),
          javascript_import_module_tag(entry_point),
          tag.script(type: "module", src: "/clapton/client.js"),
        ], "\n"
      else
        html = <<~HTML
          <script type="importmap">
            #{clapton_json.to_json}
          </script>
          <script type="module" src="/clapton/client.js"></script>
        HTML
        html.html_safe
      end
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
