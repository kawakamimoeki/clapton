module Clapton
  module ClaptonHelper

    def clapton_javascript_tag
      tag.script(src: "/clapton/index.js", type: "text/javascript")
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
