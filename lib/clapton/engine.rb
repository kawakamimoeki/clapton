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

        FileUtils.mkdir_p(Rails.root.join("public", "clapton")) unless Rails.root.join("public", "clapton").exist?
        File.write(Rails.root.join("public", "clapton", "components.js"), File.read(File.join(__dir__, "javascripts", "dist", "components.js")))
        File.write(Rails.root.join("public", "clapton", "client.js"), File.read(File.join(__dir__, "javascripts", "dist", "client.js")))
        File.write(Rails.root.join("public", "clapton", "c.js"), File.read(File.join(__dir__, "javascripts", "dist", "c.js")))

        compile_components

        listener = Listen.to(Rails.root.join("app", "components")) do |modified, added, removed|
          compile_components
        end

        listener.start
      end
    end

    def compile_components
      puts "Clapton: Compiling components"
      
      start_time = Time.now
      Dir.glob(Rails.root.join("app", "components", "**", "*.rb")).each do |file|
        code = File.read(file)
        js = ""
        js += "import { Clapton } from 'components';"
        js += "\n"
        js += "import { c } from 'c';"
        js += "\n"
        Dir.glob(Rails.root.join("app", "components", "**", "*.rb")).each do |f|
          if File.basename(file, ".rb") != File.basename(f, ".rb")
            js += "import { #{File.basename(f, ".rb").camelize} } from '#{File.basename(f, ".rb").camelize}';"
            js += "\n"
          end
        end
        js += Ruby2JS.convert(code, preset: true)
        js += "\n"
        js += "export { #{File.basename(file, ".rb").camelize} };"
        js += "\n"
        File.write(Rails.root.join("public", "clapton", "#{File.basename(file, ".rb").camelize}.js"), js)
      end
      end_time = Time.now
      puts "Clapton: Component compilation took #{end_time - start_time} seconds"
    end
  end
end
