namespace :clapton do
  task compile: :environment do
    Clapton::Engine.compile_components
    puts "Clapton components compiled"
  end
end
