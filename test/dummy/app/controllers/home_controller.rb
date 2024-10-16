class HomeController < ApplicationController
  def index
    @components = [
      [:SampleComponent, { message: "Hello World", boolean: true, datetime: Time.now }]
    ]
  end
end
