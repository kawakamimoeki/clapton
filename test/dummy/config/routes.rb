Rails.application.routes.draw do
  mount Clapton::Engine => "/clapton"

  get "/users", to: "users#index"
  get "/chat", to: "chat#index"
  get "/tasks", to: "tasks#index"
end
