Rails.application.routes.draw do


   #🟢 Sessions Controller

   # Allows existing user to sign back in
   post "/login", to: "sessions#create"
   
   # Allows logged in user to sign out
   delete "/logout", to: "sessions#destroy"


  #🟢 User Controller

  # Signup
  post "/signup", to: "users#create"

  # Reconizes signed in user
  get "/me", to: "users#show"

  post "/profile-photo", to: "users#profile_photo"


  #🟢 Tweet Controller

  # All CRUD for tweets
  resources :tweets

  
  # Categories
  resources :categories
  resources :categories, only: [:create, :index]




  # Users
  # resources :users, only: [:create, :show]
  # Allows user to sign up
 
 

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  # Fallback route
  # get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
  
end
