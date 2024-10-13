require_relative "lib/clapton/version"

Gem::Specification.new do |spec|
  spec.name        = "clapton"
  spec.version     = Clapton::VERSION
  spec.authors     = ["Moeki Kawakami"]
  spec.email       = ["moeki.kawakami@icloud.com"]
  spec.homepage    = "https://github.com/kawakamimoeki/clapton"
  spec.summary     = "Clapton is a Ruby on Rails gem for building web apps with pure Ruby only (no JavaScript and no HTML templates)."
  spec.description = "Clapton is a Ruby on Rails gem for building web apps with pure Ruby only (no JavaScript and no HTML templates)."
  spec.license     = "MIT"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  spec.metadata["allowed_push_host"] = "https://rubygems.org"

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = "https://github.com/kawakamimoeki/clapton"
  spec.metadata["changelog_uri"] = "https://github.com/kawakamimoeki/clapton/blob/main/CHANGELOG.md"

  spec.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  spec.add_dependency "rails", ">= 6.1.7.8", "< 8"
  spec.add_dependency "ruby2js", "~> 5"
  spec.add_dependency "listen", "~> 3"
  spec.add_dependency "capybara", "~> 3"
  spec.add_dependency "execjs", "~>2"
  spec.add_dependency "minitest", "~>5"
  spec.add_dependency "rspec", "~>3"
end
