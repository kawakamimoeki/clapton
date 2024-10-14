require "ruby2js"
require "listen"

module Clapton
  class Engine < ::Rails::Engine
    isolate_namespace Clapton

    initializer "clapton.helpers" do
      ActiveSupport.on_load(:action_view) do
        include ClaptonHelper
      end
    end

    initializer "clapton.action_cable_helpers" do
      ActiveSupport.on_load(:action_cable) do
        ActionCable.server.config.logger = Rails.logger
      end

      if Rails.env.development? || Rails.env.test?
        components_path = Rails.root.join("app", "components")
        FileUtils.mkdir_p(components_path) unless components_path.exist?
        FileUtils.touch(components_path.join(".keep"))

        compile_components

        listener = Listen.to(Rails.root.join("app", "components")) do |modified, added, removed|
          compile_components
        end

        listener.start
      end
    end

    def compile_components
      js = File.read(File.join(__dir__, "javascripts", "dist", "components.js"))
      js += "\n"
      js += File.read(File.join(__dir__, "javascripts", "dist", "client.js"))
      js += "\n"
      js += "window.components = [];"
      js += "\n"
      Dir.glob(Rails.root.join("app", "components", "**", "*.rb")).each do |file|
        js += Ruby2JS.convert(File.read(file), preset: true)
        js += "\n"
        js += "window.#{File.basename(file, ".rb").camelize} = #{File.basename(file, ".rb").camelize};"
        js += "\n"
      end
      FileUtils.mkdir_p(Rails.root.join("public", "clapton")) unless Rails.root.join("public", "clapton").exist?
      File.write(Rails.root.join("public", "clapton", "index.js"), js)
    end
  end
end
