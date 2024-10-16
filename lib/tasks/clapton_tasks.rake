namespace :clapton do
  task compile: :environment do
    FileUtils.mkdir_p(Rails.root.join("public", "clapton")) unless Rails.root.join("public", "clapton").exist?
    File.write(Rails.root.join("public", "clapton", "components.js"), File.read(File.join(__dir__, "..", "clapton", "javascripts", "dist", "components.js")))
    File.write(Rails.root.join("public", "clapton", "client.js"), File.read(File.join(__dir__, "..", "clapton", "javascripts", "dist", "client.js")))
    File.write(Rails.root.join("public", "clapton", "c.js"), File.read(File.join(__dir__, "..", "clapton", "javascripts", "dist", "c.js")))

    Clapton::Engine.compile_components
  end
end
