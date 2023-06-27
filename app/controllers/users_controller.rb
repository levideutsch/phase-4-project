class UsersController < ApplicationController

    skip_before_action :authorize, only: [:create, :show]

    #User signs up
    def create 
        # Create a user with these specific given attributes
        user = User.create(user_params)
        # If the user is valid
        if user.valid?
            # Create a new session 
            session[:user_id] = user.id
            # Then render it as json
            render json: user, status: :created
            # But if the user is not valid 
        else 
            # Return an error response
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def create_profile_photo
        user = User.find(params[:id])
    
        if user.update(profile_photo: params[:profile_photo])
          # Profile photo successfully updated
          render json: { message: 'Profile photo uploaded successfully' }
        else
          # Failed to update profile photo
          render json: { error: 'Failed to upload profile photo' }, status: :unprocessable_entity
        end
      end

    #Displays one specific user
#     def show
#         user = current_user
#         if user
#             #all_tweets = Tweet.all.includes(:category).order("created_at DESC")
#             render json: user #{ user: user, tweets: all_tweets } ,status: :ok
#         else 
#             render json: { error: "Not authorized" }, status: :unauthorized
#     end
# end

def show
    user = current_user
    if user
      all_tweets = Tweet.includes(:category).order("created_at DESC")
      response = {
        id: user.id,
        username: user.username,
        profile_photo: user.profile_photo,
        password: nil,
        tweets: all_tweets.as_json(only: [:id, :body], include: { category: { only: [:id, :category] }, user: { only: [:id, :username] } }),
        #categories: Category.all.as_json(only: [:id, :category])
      }
      render json: response, status: :ok
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end

  end

 
    # def show
    #     users = User.all
    #     render json: users, each_serializer: UserSerializer, status: :ok
    #   end

 
  
#   def show 
#     user = current_user
#     render json: user,  serializer: UserTweetsSerializer, status: :ok
#   end

# def show 
#     user = current_user
#     render json: user, serializer: UserTweetsSerializer, status: :ok
#   end
  


    #Displays all users    
    # def index
    #     users = User.all
    #     render json: users, status: :ok
    # end


    private 

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end

end