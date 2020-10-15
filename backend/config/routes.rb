Rails.application.routes.draw do
  resources :users do
  resources :products 
  end
  get 'session', to: 'users#verify_login'
  post '/login', to: 'users#login'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
