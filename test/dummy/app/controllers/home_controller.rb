class HomeController < ApplicationController
  def index
    @components = [
      [:SampleComponent, {}]
    ]
  end
end
