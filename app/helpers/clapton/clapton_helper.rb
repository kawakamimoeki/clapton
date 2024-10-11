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
  end
end
