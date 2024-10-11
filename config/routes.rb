Clapton::Engine.routes.draw do
  post '/api/action', to: 'api#index'
  mount ActionCable.server => '/cable'
end
