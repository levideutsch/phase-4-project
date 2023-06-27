# Controller logic: fallback requests for React Router.
# Leave this here to help deploy your app later!
class FallbackController < ActionController::Base

  def index
    # React app index page
    render file:'public/index.html'
    
  end
end

# class FallbackController < ActionController::Base
#   def index
#     # Get the absolute path to the 'index.html' file
#     index_html_path = Rails.public_path.join('index.html')

#     # Render the 'index.html' file
#     render file: index_html_path, layout: false
#   end
# end
# class FallbackController < ApplicationController
#   def index
#     # Render the 'index.html' file
#     render file: Rails.root.join('public', 'index.html'), layout: false
#   end
# end